import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const runtimeRequire = createRequire(import.meta.url);

(function securityTests(){
function loadSource(file,overrides={},globals={}){
 const exports={};const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 vm.runInNewContext(code,{exports,require:name=>Object.hasOwn(overrides,name)?overrides[name]:runtimeRequire(name),TextDecoder,Request,Response,Event,URLSearchParams,...globals},{filename:file});return exports;
}
function fixture(result={data:{id:'test-id'},error:null},throws=false){
 const messages=[];class Resend{constructor(){this.emails={send:async payload=>{messages.push(payload);if(throws)throw new Error('private-provider-detail');return result;}};}}
 const validation=loadSource('src/lib/contact-validation.ts');
 const route=loadSource('src/app/api/contact/route.ts',{resend:{Resend},'next/server':{NextResponse:{json:(body,options)=>Response.json(body,options)}},'@/lib/contact-validation':validation},{process:{env:{RESEND_API_KEY:'mock-placeholder'}},console:{log(){},error(){}}});
 return{post:route.POST,messages};
}
const valid={name:'Contact Test',email:'test@example.com',company:'Example',budget:'Discutăm',message:'Please discuss my project.'};
function request(body,headers={}){return new Request('http://localhost/api/contact',{method:'POST',headers:{'content-type':'application/json','x-forwarded-for':'192.0.2.10',...headers},body:JSON.stringify(body)});}
// Approved audit scope: validate every field server-side and bound request bytes.
for(const[label,payload]of[
 ['missing name',{...valid,name:''}],['whitespace name',{...valid,name:'   '}],['numeric email',{...valid,email:123}],
 ['object message',{...valid,message:{}}],['oversized name',{...valid,name:'x'.repeat(101)}],['oversized email',{...valid,email:'x'.repeat(201)}],
 ['oversized message',{...valid,message:'x'.repeat(5001)}],['newline email',{...valid,email:'test@example.com\nBcc:other@example.com'}],
 ['object company',{...valid,company:{}}],['oversized company',{...valid,company:'x'.repeat(201)}],
 ['numeric budget',{...valid,budget:2000}],['oversized budget',{...valid,budget:'x'.repeat(101)}],
 ['invalid honeypot',{...valid,_hp:true}],['null body',null],['array body',[]]
])test('Contact rejects '+label+' without sending',async()=>{const f=fixture();assert.equal((await f.post(request(payload))).status,400);assert.equal(f.messages.length,0);});
test('Valid contact escapes HTML, strips header newlines and uses the fixed recipient',async()=>{
 const f=fixture();assert.equal((await f.post(request({...valid,name:'  <script>bad()</script>\nHeader  ',company:'" onclick="bad()\nCompany',message:'<img src=x onerror=bad()> & "quote"'}))).status,200);
 assert.equal(f.messages.length,1);const mail=f.messages[0];assert.equal(mail.to,'office@acl-smartsoftware.ro');assert.equal(mail.replyTo,valid.email);
 assert.doesNotMatch(mail.subject,/[\r\n]/);assert.doesNotMatch(mail.html,/<script>|<img src=x/);assert.match(mail.html,/&lt;img/);assert.match(mail.html,/&quot;/);
});
test('Contact accepts omitted optional fields',async()=>{const f=fixture();assert.equal((await f.post(request({name:valid.name,email:valid.email,message:valid.message}))).status,200);assert.equal(f.messages.length,1);});
test('Honeypot never reaches the email provider',async()=>{const f=fixture();assert.equal((await f.post(request({_hp:'bot'}))).status,200);assert.equal(f.messages.length,0);});
test('Malformed JSON returns 400 with no transport or internal details',async()=>{const f=fixture();const r=await f.post(new Request('http://localhost/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:'{'}));assert.equal(r.status,400);assert.equal(f.messages.length,0);assert.deepEqual(await r.json(),{error:'Date invalide.'});});
for(const[label,body,headers]of[
 ['declared length',valid,{'content-length':'65537'}],
 ['no length',{...valid,message:'x'.repeat(65537)},{}],
 ['false small length',{...valid,message:'x'.repeat(65537)},{'content-length':'1'}]
])test('Contact bounds oversized body: '+label,async()=>{const f=fixture();assert.equal((await f.post(request(body,headers))).status,413);assert.equal(f.messages.length,0);});
test('Provider rejection returns generic 502',async()=>{const f=fixture({data:null,error:{message:'private-provider-detail'}});const r=await f.post(request(valid));assert.equal(r.status,502);assert.doesNotMatch(JSON.stringify(await r.json()),/private-provider-detail/);});
test('Provider exception returns generic 500',async()=>{const f=fixture(undefined,true);const r=await f.post(request(valid));assert.equal(r.status,500);assert.doesNotMatch(JSON.stringify(await r.json()),/private-provider-detail/);});
test('Existing per-process limiter blocks the fourth attempt',async()=>{const f=fixture();const statuses=[];for(let i=0;i<4;i++)statuses.push((await f.post(request({_hp:'bot'}))).status);assert.deepEqual(statuses,[200,200,200,429]);});
function consentFixture(){const values=new Map();const window=new EventTarget();window.localStorage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};return{values,window,consent:loadSource('src/lib/consent.ts',{},{window})};}
test('Optional measurement defaults off and follows accepted/declined/invalid choices',()=>{const{consent,values}=consentFixture();assert.equal(consent.optionalAnalyticsAllowed(),false);consent.saveConsent('accepted');assert.equal(consent.optionalAnalyticsAllowed(),true);consent.saveConsent('declined');assert.equal(consent.optionalAnalyticsAllowed(),false);values.set(consent.CONSENT_KEY,'invalid');assert.equal(consent.optionalAnalyticsAllowed(),false);});
test('Consent synchronizes in current tab and cross-tab, and cleans up listeners',()=>{const{consent,values,window}=consentFixture();let events=0;const cleanup=consent.subscribeConsent(()=>events++);consent.saveConsent('accepted');assert.equal(events,1);values.set(consent.CONSENT_KEY,'declined');const event=new Event('storage');Object.defineProperty(event,'key',{value:consent.CONSENT_KEY});window.dispatchEvent(event);assert.equal(events,2);assert.equal(consent.optionalAnalyticsAllowed(),false);cleanup();consent.saveConsent('accepted');assert.equal(events,2);});
test('Unavailable storage keeps measurement off',()=>{const window=new EventTarget();window.localStorage={getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');}};const consent=loadSource('src/lib/consent.ts',{},{window});consent.saveConsent('accepted');assert.equal(consent.optionalAnalyticsAllowed(),false);});
test('Server rendering never includes tracking components',()=>{const{renderToStaticMarkup}=runtimeRequire('react-dom/server');const React=runtimeRequire('react');let trackers=0;const Component=loadSource('src/components/layout/ConsentAnalytics.tsx',{'@/lib/consent':{subscribeConsent:()=>()=>{},optionalAnalyticsAllowed:()=>true},'@vercel/analytics/next':{Analytics:()=>{trackers++;return null;}},'@vercel/speed-insights/next':{SpeedInsights:()=>{trackers++;return null;}}}).default;assert.equal(renderToStaticMarkup(React.createElement(Component)),'');assert.equal(trackers,0);});
test('Share metadata has exact localized URLs and 1200x630 images',()=>{const{socialMetadata}=loadSource('src/lib/seo.ts');for(const locale of['ro','en']){const m=socialMetadata(locale,'Page title','Page description','/servicii/produse');const p=locale==='en'?'/en':'';assert.equal(m.openGraph.url,'https://acl-smartsoftware.ro'+p+'/servicii/produse');assert.equal(m.openGraph.images[0].url,'https://acl-smartsoftware.ro'+p+'/opengraph-image');assert.equal(m.openGraph.title,m.twitter.title);assert.equal(m.openGraph.description,m.twitter.description);assert.equal(m.twitter.card,'summary_large_image');assert.equal(m.openGraph.images[0].width,1200);assert.equal(m.openGraph.images[0].height,630);}});
})();