import { getLocale } from 'next-intl/server';
import { STEPS } from '@/data';
import ProcessJourney from './ProcessJourney';

const STEPS_EN = [
  { n: '01', title: 'Consulting', desc: 'We discuss what you want to solve, who will use the product and what matters in the first version. We agree on the scope before implementation.', deliver: ['A clearly defined need', 'Agreed priorities', 'An initial estimate'] },
  { n: '02', title: 'Architecture', desc: 'We turn the idea into workflows and a design you can discuss. We choose a technical approach that fits the project.', deliver: ['User workflows', 'Interface proposal', 'Implementation plan'] },
  { n: '03', title: 'Development', desc: 'We build in stages and show working versions in demos approximately every two weeks. You can check the product and give feedback while it develops.', deliver: ['Working versions', 'Demos and feedback', 'Progress updates'] },
  { n: '04', title: 'Testing', desc: 'We check the important workflows, error cases and access rules before launch. We fix identified issues within the agreed scope.', deliver: ['Main workflows checked', 'Errors addressed', 'A version ready for launch'] },
  { n: '05', title: 'Launch', desc: 'We publish the product in the agreed environment and check that it is available. You receive access and the guidance needed to use it.', deliver: ['Live product', 'Agreed access', 'Usage instructions'] },
  { n: '06', title: 'Maintenance', desc: 'After launch, you receive one year of free support for usage help and bug fixes in the delivered product. New features and additional work are agreed separately.', deliver: ['One year of free support', 'Usage help and bug fixes', 'Separate plan for new features'] },
];

export default async function Process() {
  const locale = await getLocale();
  const en = locale === 'en';
  return <section className="section process" id="proces"><div className="wrap">
    <div className="section-heading"><div><p className="eyebrow">{en ? 'How we work' : 'Cum lucrăm'}</p>
      <h2>{en ? 'From the first conversation' : 'De la prima discuție'}<br /><em>{en ? 'to a working product.' : 'la un produs funcțional.'}</em></h2></div>
      <p>{en ? 'Six stages, with a clear purpose. You know where the project stands and what comes next.' : 'Șase etape, fiecare cu un scop clar. Știi unde se află proiectul și ce urmează.'}</p>
    </div>
    <ProcessJourney steps={en ? STEPS_EN : STEPS} locale={locale} />
  </div></section>;
}
