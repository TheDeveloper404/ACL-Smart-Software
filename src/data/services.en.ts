import type { Service } from '@/types';

export const SERVICES_EN: Service[] = [
  {
    "slug": "ai",
    "title": "API integrations and AI assistants",
    "short": "We connect the applications you already use — payments, invoicing, calendar, CRM, store — and put an AI assistant in charge of customer enquiries.",
    "tags": [
      "API integrations",
      "Automation",
      "AI assistants"
    ],
    "tagline": "Connected applications. Captured enquiries. Less repetitive work.",
    "longDesc": "We connect your website to Stripe, SmartBill, WhatsApp, Google Calendar or your CRM, through APIs or platforms such as n8n and Make. Where it helps, we add an AI assistant that answers customers and carries the enquiry through to the end.",
    "packages": [
      {
        "id": "integration",
        "name": "Integration between applications (API, n8n, Make)",
        "from": "Request a quote",
        "duration": "Estimated after checking the applications",
        "model": "API integrations and automation",
        "includes": [
          "We connect your website to payments, invoicing, CRM, couriers or suppliers",
          "We use n8n, Make or existing connectors; we write code only where a link is missing",
          "We test the workflow end to end, including errors: failed payment, missing data"
        ],
        "deliverable": "A workflow that runs on its own. Example: a confirmed Stripe payment issues the invoice in SmartBill and emails it to the customer.",
        "priceNote": "External service subscriptions (n8n, Make, invoicing) are discussed separately."
      },
      {
        "id": "customer-assistant",
        "name": "AI assistant for enquiries and appointments",
        "from": "Request a quote",
        "duration": "Estimated after defining the workflow",
        "model": "AI assistants",
        "includes": [
          "An assistant on your website or WhatsApp Business, trained on information about your services",
          "Asks for missing details and saves the appointment in Google Calendar or sends it to your team",
          "Hands the conversation over to a person in the agreed situations"
        ],
        "deliverable": "An assistant that takes the enquiry, asks for the details and books the appointment — including evenings and weekends.",
        "priceNote": "AI platform and WhatsApp Business costs are estimated separately."
      },
      {
        "id": "shop-assistant",
        "name": "AI assistant for your online store",
        "from": "Request a quote",
        "duration": "Estimated after checking the store",
        "model": "AI assistants",
        "includes": [
          "Integrated into WooCommerce, Shopify or your store platform",
          "Recommends products from the catalog and answers questions about order status",
          "Customers only see their own order data; exceptions go to your team"
        ],
        "deliverable": "An assistant that helps shoppers choose the right product and tells them where their order is.",
        "priceNote": "Subscriptions and AI usage are discussed separately."
      }
    ],
    "whatWeBuild": [
      {
        "title": "From payment to invoice",
        "desc": "A confirmed website payment triggers invoice generation in your invoicing application. The API integration moves data and automation runs the agreed steps."
      },
      {
        "title": "From conversation to appointment",
        "desc": "The customer describes what they need. AI interprets the request and asks for the required details; the integration checks availability and saves the appointment."
      },
      {
        "title": "Help inside your store",
        "desc": "A shopper explains what they want or asks about their order. The assistant uses the catalog and available data, while your team takes over situations needing intervention."
      }
    ],
    "audience": [
      {
        "title": "You use applications that need connecting",
        "desc": "Your website, invoicing tool, CRM or suppliers do not exchange the information your workflow needs."
      },
      {
        "title": "You receive enquiries and appointments",
        "desc": "You want to collect customer details and carry them through to a booking or the person responsible for the enquiry."
      },
      {
        "title": "You run an online store",
        "desc": "Customers need help choosing products and finding information about their orders."
      }
    ],
    "technologies": [],
    "pricing": {
      "from": "Request a quote",
      "duration": "After checking applications and the workflow",
      "model": "Implementation with an agreed scope"
    },
    "timeline": "Agreed after defining the workflow",
    "faq": [
      {
        "q": "What do I get beyond an AI subscription or MCP?",
        "a": "Existing tools may already cover part or all of the workflow. We check that option first. Our service covers selecting and configuring the solution, connecting your applications, making the required adaptations and testing the complete workflow. If an existing tool meets your needs without implementation, we tell you."
      },
      {
        "q": "Does every integration need AI?",
        "a": "No. Data transfers and steps with defined rules can run through APIs and automation. We use AI to interpret enquiries and handle customer conversations where it is useful."
      },
      {
        "q": "Do you build everything from scratch?",
        "a": "We use existing platforms and connectors when they meet the requirements. Custom development covers missing connections or behavior, after checking the alternatives."
      },
      {
        "q": "Can you connect any application?",
        "a": "It depends on the access and actions each application provides. We check APIs, connectors and permissions before confirming what we can deliver."
      },
      {
        "q": "What costs remain after implementation?",
        "a": "The assistant platform, AI usage, WhatsApp, hosting or other services may have recurring costs. We identify these in the quote. Any subsequent support is agreed separately."
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
        "from": "Request a quote",
        "duration": "Estimated after defining the first version",
        "model": "Essential features for validation",
        "includes": [
          "Defining users and the problem to solve",
          "Design and implementation of the main workflow",
          "Features needed by the first users",
          "Testing, launch and next-version planning"
        ],
        "deliverable": "A working first version to test your idea with users before expanding the product.",
        "priceNote": "A first version can mean different things. We define its essential workflow before setting a budget."
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
        "from": "Request a quote",
        "duration": "Agreed sessions and deliverables",
        "model": "Planning or reviewing an existing product",
        "includes": [
          "Discussing goals, users and budget",
          "Review of the existing application or proposed idea",
          "Prioritising required features and integrations",
          "Implementation plan and stage estimates"
        ],
        "deliverable": "A clear recommendation and plan for what to build or improve.",
        "priceNote": "The required analysis, number of sessions and agreed deliverables determine the price."
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
