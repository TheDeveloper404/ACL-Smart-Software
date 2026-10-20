import type { Service } from '@/types';

export const SERVICES_EN: Service[] = [
  {
    "slug": "ai",
    "title": "AI for your business",
    "short": "We automate work with documents and messages and add AI to your applications, connected to your company data.",
    "tags": [
      "Document processing",
      "Customer assistant",
      "AI agents"
    ],
    "tagline": "AI that works inside your applications, not in a chat window.",
    "longDesc": "We start with an activity that costs you time: entering data from documents, answering the same questions or a process with many steps. We connect AI to your applications and data so it works automatically, at volume, without manual copying. We test on real examples from your work and agree together on what a person reviews.",
    "packages": [
      {
        "id": "document-processing",
        "name": "Automated document processing",
        "from": "On request",
        "duration": "Estimated after reviewing the documents",
        "model": "Agreed documents and fields",
        "includes": [
          "Automatic intake from email, a folder or an application",
          "Extraction of the fields you need: supplier, amounts, dates, products",
          "Human review only for unclear cases",
          "Data lands in Excel, your invoicing software or your application"
        ],
        "deliverable": "A workflow that takes in documents and puts the data straight where you work, with no manual entry.",
        "priceNote": "On request: the cost depends on document types and volume, the fields to extract and the application receiving the data."
      },
      {
        "id": "customer-assistant",
        "name": "Assistant for your customers",
        "from": "On request",
        "duration": "Estimated after agreeing the channels",
        "model": "Agreed channels and topics",
        "includes": [
          "Answers on your website, by email or on WhatsApp",
          "Information from your data: opening hours, prices, services, order status",
          "Hand-over to a person when the assistant does not know",
          "Conversation history for review"
        ],
        "deliverable": "An assistant that answers your customers with your company information and knows when to call a person.",
        "priceNote": "On request: the cost depends on channels, data sources and conversation volume. WhatsApp Business and AI models have separate recurring costs."
      },
      {
        "id": "automation-agent",
        "name": "AI agent for one workflow",
        "from": "€2,000",
        "duration": "3–6 weeks",
        "model": "One agreed workflow",
        "includes": [
          "Define the steps, data and workflow rules",
          "Connect the relevant applications within available access",
          "Human confirmation for agreed actions",
          "Tests, execution records and error handling"
        ],
        "deliverable": "A process that runs on its own, for example a quote request turned into a draft quote that you only approve.",
        "priceNote": "From €2,000 for one defined process with agreed rules and access. Additional processes are estimated separately."
      },
      {
        "id": "ai-feature",
        "name": "AI in an existing product",
        "from": "€3,500",
        "duration": "3–5 weeks",
        "model": "One agreed feature",
        "includes": [
          "One feature: search, summarisation, classification or text generation",
          "Integration into your application and workflow",
          "Usage limits and cost tracking",
          "Tests against representative product examples"
        ],
        "deliverable": "An AI feature integrated into your product that you can evaluate with users.",
        "priceNote": "From €3,500 for one feature integrated into an existing application. The quote depends on code access and the changes required."
      },
      {
        "id": "ai-assessment",
        "name": "Assessment: where AI helps you",
        "from": "On request",
        "duration": "1–2 sessions",
        "model": "Assessment before investment",
        "includes": [
          "A discussion of the activities that take up most of your time",
          "2–3 processes where AI saves time or money",
          "Cost and effort estimate for each",
          "Recommendation: what is worth doing with AI and what is not"
        ],
        "deliverable": "A short list of processes suited to AI, with estimates, to decide what you do next.",
        "priceNote": "On request: depends on the number of processes assessed and the data available."
      }
    ],
    "whatWeBuild": [
      {
        "title": "Documents without manual entry",
        "desc": "Invoices, delivery notes or orders become data in your application, with human review only where needed."
      },
      {
        "title": "Customers who get an immediate answer",
        "desc": "An assistant answers on your website, by email or on WhatsApp with your company information."
      },
      {
        "title": "Processes that run on their own",
        "desc": "An agent handles the repetitive steps in your applications, and you approve only what matters."
      }
    ],
    "audience": [
      {
        "title": "You lose time on the same tasks",
        "desc": "Your team enters data, answers the same questions or prepares the same documents."
      },
      {
        "title": "You already have an application",
        "desc": "You want to add an AI feature without rebuilding the entire product."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€2,000",
      "duration": "The final estimate follows scope definition",
      "model": "Agreed project scope"
    },
    "timeline": "3–6 weeks, indicative",
    "faq": [
      {
        "q": "Why not just use ChatGPT?",
        "a": "ChatGPT is useful for one document or one question entered by hand. We connect AI to your applications and data so it works automatically and at volume, without manual copying, answers your customers with real information and respects who has access to what."
      },
      {
        "q": "Can it be integrated into an existing application?",
        "a": "Yes. We first review how the application works and what access we have to its code or interfaces, then agree on the integration."
      },
      {
        "q": "Does the price include AI model costs?",
        "a": "The starting price covers implementation. Recurring model and hosting costs are estimated separately based on usage."
      },
      {
        "q": "Where does my data go?",
        "a": "Before implementation, we agree on which data may be processed, who has access and which providers may be used. The choice depends on project requirements."
      },
      {
        "q": "Can the agent take actions without approval?",
        "a": "Only explicitly agreed actions. For actions with an impact, we define confirmations and limits before implementation."
      }
    ]
  },
  {
    "slug": "infrastructura",
    "title": "API integrations and automation",
    "short": "We integrate the applications you use (CRM, payments, invoicing) through APIs and automate the steps you repeat every day. Custom software integration solutions.",
    "tags": [
      "API integrations",
      "Repetitive workflows",
      "Connected applications"
    ],
    "tagline": "Less moving data around. A simpler workflow.",
    "longDesc": "We choose a clearly defined process, identify its applications and data, and agree on the rules. Steps with clear rules do not need AI: an ordinary integration or automation is simpler, cheaper and more predictable. We define how errors are handled and which actions require human confirmation.",
    "packages": [
      {
        "id": "integration",
        "name": "Connect two applications",
        "from": "€1,500",
        "duration": "1–3 weeks",
        "model": "One agreed integration",
        "includes": [
          "Review the available interfaces and access",
          "Transfer the required data between applications",
          "Handle errors and avoid duplicate transfers",
          "Main-flow tests and documentation"
        ],
        "deliverable": "A working integration between two applications for the agreed data and actions.",
        "priceNote": "From €1,500 for one data flow between two applications with available interfaces. Provider access and costs are checked first."
      },
      {
        "id": "workflow-automation",
        "name": "Workflow automation",
        "from": "On request",
        "duration": "Estimated after reviewing the process",
        "model": "Agreed steps and rules",
        "includes": [
          "Review of repetitive tasks in your work",
          "Triggers and rules without AI where sufficient",
          "Notifications, retries and error handling",
          "Testing and instructions for your team"
        ],
        "deliverable": "An automated workflow for repetitive tasks, such as receiving requests or preparing documents.",
        "priceNote": "On request: the steps, connected applications and process exceptions determine the scope and price."
      }
    ],
    "whatWeBuild": [
      {
        "title": "Data synced between applications",
        "desc": "Orders, customers or invoices move automatically from one application to another, without double entry."
      },
      {
        "title": "Automatically triggered steps",
        "desc": "An event, such as a new order or a submitted form, starts the notifications and next steps on its own."
      },
      {
        "title": "Applications that exchange data",
        "desc": "Connect a website, CRM, payment system or other tools that provide integration access."
      }
    ],
    "audience": [
      {
        "title": "You repeat the same steps",
        "desc": "Your team repeatedly copies data between applications or prepares the same documents."
      },
      {
        "title": "You use multiple applications",
        "desc": "Information has to be entered manually into each tool."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€1,500",
      "duration": "Integration: 1–3 weeks",
      "model": "Agreed project scope"
    },
    "timeline": "1–3 weeks, indicative",
    "faq": [
      {
        "q": "Does every automation need AI?",
        "a": "No. For steps with clear rules, ordinary automation is simpler and more suitable. When the process requires understanding documents or messages, the right fit is an AI agent, under AI for your business."
      },
      {
        "q": "Can you connect any application?",
        "a": "It depends on the access provided by the application: APIs, exports, webhooks or other interfaces. We check this before preparing a quote."
      },
      {
        "q": "What happens when a step fails?",
        "a": "We agree on how errors are reported, what can be retried and when a person must intervene. These rules form part of the project scope."
      }
    ]
  },
  {
    "slug": "produse",
    "title": "Websites, portals and SaaS",
    "short": "From a company website to a user portal or a product sold through subscriptions.",
    "tags": [
      "Websites",
      "Portals",
      "SaaS products"
    ],
    "tagline": "A product built around what people need to do.",
    "longDesc": "We clarify the users and important workflows, prepare the design and build in stages. You see the product as it develops and give feedback before launch. At handover, you receive access to the code and the guidance needed to use and administer it.",
    "packages": [
      {
        "id": "website",
        "name": "Company website",
        "from": "€1,200",
        "duration": "2–3 weeks",
        "model": "Agreed pages and content",
        "includes": [
          "Design adapted to your identity",
          "Presentation pages and mobile navigation",
          "Contact form and technical SEO elements",
          "Launch on your domain and code access"
        ],
        "deliverable": "A public website that clearly explains what you do and how to contact you.",
        "priceNote": "From €1,200 for a presentation website with agreed pages. Shop, portal and application features are estimated separately."
      },
      {
        "id": "app-web",
        "name": "Web application or portal",
        "from": "€3,500",
        "duration": "5–8 weeks",
        "model": "Agreed workflows and features",
        "includes": [
          "User accounts and roles",
          "Pages and tools for the main workflows",
          "Integrations defined in the quote",
          "Tests, launch and administration instructions"
        ],
        "deliverable": "An application or portal for customers, your team, students or teachers.",
        "priceNote": "From €3,500 for agreed main workflows and roles. Additional features and integrations are quoted separately."
      },
      {
        "id": "mvp-saas",
        "name": "SaaS product",
        "from": "€4,500",
        "duration": "6–10 weeks",
        "model": "First version with agreed scope",
        "includes": [
          "Essential features for the first version",
          "Accounts and separation of user data",
          "Subscriptions and payments within the agreed scope",
          "Administration panel, tests and launch"
        ],
        "deliverable": "A first version of your SaaS product, ready for customers to use.",
        "priceNote": "From €4,500 for the first SaaS version with agreed essential features. Expansion after validation is estimated separately."
      },
      {
        "id": "product-mvp",
        "name": "MVP for your idea",
        "from": "On request",
        "duration": "Estimated after defining the first version",
        "model": "Essential features for validation",
        "includes": [
          "Defining users and the problem to solve",
          "Design and implementation of the main workflow",
          "Features needed by the first users",
          "Testing, launch and next-version planning"
        ],
        "deliverable": "A working first version to test your idea with users before expanding the product.",
        "priceNote": "On request: a first version can mean different things. We define its essential workflow before setting a budget."
      }
    ],
    "whatWeBuild": [
      {
        "title": "Websites for businesses",
        "desc": "Services, projects and contact details are easy to find, including on a phone."
      },
      {
        "title": "User portals",
        "desc": "A space with role-based access for courses, documents or customer and team operations."
      },
      {
        "title": "SaaS products",
        "desc": "Subscription applications with the features your first users need."
      }
    ],
    "audience": [
      {
        "title": "You need an online presence",
        "desc": "You want to explain your business clearly and make contact easier."
      },
      {
        "title": "Your workflow needs an application",
        "desc": "An adapted portal or tool can help organise your work."
      },
      {
        "title": "You want to launch a product",
        "desc": "We define the first version around essential user features."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€1,200",
      "duration": "Website: 2–3 weeks; portal or SaaS: 5–10",
      "model": "Agreed project scope"
    },
    "timeline": "2–10 weeks, indicative",
    "faq": [
      {
        "q": "What is the difference between a website and a portal?",
        "a": "A website presents public information. A portal gives users accounts and access to features or materials according to their role."
      },
      {
        "q": "Does the code remain mine?",
        "a": "Yes. We hand over the project code and access to agreed resources together with the necessary documentation."
      },
      {
        "q": "Can I see the product before launch?",
        "a": "Yes. We show working versions along the way so you can check the workflows and give feedback."
      },
      {
        "q": "What does the starting price mean?",
        "a": "It is a reference for a project with a defined scope. The final quote depends on features, content, integrations and requirements. Hosting and other recurring costs are discussed separately."
      },
      {
        "q": "How does an MVP differ from a SaaS product?",
        "a": "An MVP is a first version for testing an idea and its main workflow. A SaaS product also includes subscription-related features such as account and payment management. We agree on the features for each project."
      }
    ]
  },
  {
    "slug": "consultanta",
    "title": "Consultation, audit and maintenance",
    "short": "We plan new projects, assess existing applications and provide support after launch.",
    "tags": [
      "Project planning",
      "Web and API audits",
      "Post-launch support"
    ],
    "tagline": "Understand what needs checking and what to fix first.",
    "longDesc": "Consultation clarifies features and implementation stages. For audits, we define authorised scope and access, assess the application and document findings with evidence and priorities. Maintenance covers the tasks and interventions agreed in the project quote.",
    "packages": [
      {
        "id": "security-audit",
        "name": "Web and API security audit",
        "from": "€1,500",
        "duration": "1 day–1 week",
        "model": "Authorised and agreed scope",
        "includes": [
          "Checks within the agreed scope, referencing OWASP ASVS and Top 10",
          "Evidence for identified issues",
          "Report with impact and remediation priorities",
          "Discussion of next steps"
        ],
        "deliverable": "An audit report with documented issues and remediation recommendations.",
        "priceNote": "From €1,500 for the agreed scope and audit report. Remediation is quoted separately."
      },
      {
        "id": "maintenance",
        "name": "Application maintenance",
        "from": "€500 / month",
        "duration": "Monthly collaboration",
        "model": "Agreed work and availability",
        "includes": [
          "Agreed periodic updates and checks",
          "Bug fixes within the defined package",
          "Support for use and administration",
          "Prioritised work and progress communication"
        ],
        "deliverable": "A maintenance plan with clear activities and conditions.",
        "priceNote": "From €500 per month. Tasks, allocated time and availability are agreed in the quote; interventions are not unlimited."
      },
      {
        "id": "project-consultation",
        "name": "Consultation for your project",
        "from": "On request",
        "duration": "Agreed sessions and deliverables",
        "model": "Planning or reviewing an existing product",
        "includes": [
          "Discussing goals, users and budget",
          "Review of the existing application or proposed idea",
          "Prioritising required features and integrations",
          "Implementation plan and stage estimates"
        ],
        "deliverable": "A clear recommendation and plan for what to build or improve.",
        "priceNote": "On request: the required analysis, number of sessions and agreed deliverables determine the price."
      }
    ],
    "whatWeBuild": [
      {
        "title": "A plan for your project",
        "desc": "We clarify your idea or review the existing application, then propose priorities and implementation stages."
      },
      {
        "title": "A report you can act on",
        "desc": "Evidence, impact and a recommended remediation order for the assessed scope."
      },
      {
        "title": "Continuity after launch",
        "desc": "Updates, fixes and support organised within an agreed maintenance plan."
      }
    ],
    "audience": [
      {
        "title": "You have an application to assess",
        "desc": "You want to understand risks before launch or in an existing product."
      },
      {
        "title": "You need technical support",
        "desc": "You want a point of contact for website or application maintenance."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "€1,500",
      "duration": "Audit estimate follows scope definition",
      "model": "Fixed audit; optional monthly maintenance"
    },
    "timeline": "Audit: 1 day–1 week, indicative",
    "faq": [
      {
        "q": "Does an audit guarantee there are no more vulnerabilities?",
        "a": "No. The report describes checks and issues identified within the agreed scope and period. It does not guarantee that the application has no other vulnerabilities."
      },
      {
        "q": "Do you need permission to test?",
        "a": "Yes. We only assess systems with authorisation and a scope agreed before work starts."
      },
      {
        "q": "Does the audit include fixes?",
        "a": "The audit delivers the report and recommendations. Any fixes are agreed separately based on identified issues."
      },
      {
        "q": "What does maintenance include?",
        "a": "Activities, allocated time and availability are defined in the project quote and contract based on the application."
      }
    ]
  }
];
