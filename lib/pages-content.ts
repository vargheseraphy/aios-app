/**
 * Page copy for /for-business, /for-institutions and /contact, kept
 * separate from the components that render it — the same separation
 * lib/content.ts gives the book's lesson data, applied to marketing copy
 * so it can be edited without touching layout/JSX. Text that names a real
 * module or lesson stores only the reference (module number, lesson file
 * id); the title, framework count and prompt text are always read live
 * from lib/content.ts, never duplicated here, so this file can't drift
 * from the real content it points at.
 *
 * `**bold**` inside a string renders as <strong> — see components/RichText.tsx.
 */

export interface PromptRef {
  module: number;
  /** two-digit lesson file id, e.g. "02" for lesson 4.2 */
  fileId: string;
}

export interface Department {
  id: string;
  number: string;
  name: string;
  colorKey: "sales" | "marketing" | "ops" | "people" | "leadership";
  situation: string;
  detail: string;
  /** module numbers this team lives in, in display order */
  moduleRefs: number[];
  promptRef: PromptRef;
}

export const FOR_BUSINESS_CONTENT = {
  crumb: "For business",
  heroHeading: "Every function in your company already uses AI. None of them the same way.",
  heroSub:
    "Sales prompts differently from operations, which prompts differently from marketing, and none of the output can be compared. One shared set of 108 frameworks fixes the input across the whole org — and every department gets the ones written for its own job.",
  heroPrimaryCta: { label: "See it by department", href: "#depts" },
  heroSecondaryCta: { label: "Request a quote", href: "#order" },

  deptsKicker: "By department",
  deptsHeading: "Find your org chart. Every function has its own frameworks.",
  deptsSub:
    "Each one below lists the modules that team lives in and one real prompt from them — the actual text, not a description of it.",

  departments: [
    {
      id: "sales",
      number: "01",
      name: "Sales",
      colorKey: "sales",
      situation:
        "Every rep runs discovery their own way, so no two call notes answer the same questions. **Coaching becomes guesswork, because there is nothing consistent to coach against.**",
      detail:
        "Module 04 gives the team one structure for discovery, qualification, objections and proposals. Module 03 sits behind it, so the market view a rep argues from is the same one the company holds.",
      moduleRefs: [4, 3],
      promptRef: { module: 4, fileId: "02" },
    },
    {
      id: "marketing",
      number: "02",
      name: "Marketing",
      colorKey: "marketing",
      situation:
        "Three people describe the company three ways in the same week, on the site, in a deck and in a campaign. **The positioning drifts without anyone deciding to change it.**",
      detail:
        "Module 05 puts messaging, content and launches on one spine. Module 02 anchors it to what the business actually is, so the story marketing tells matches the model the founders are running.",
      moduleRefs: [5, 2],
      promptRef: { module: 5, fileId: "01" },
    },
    {
      id: "ops",
      number: "03",
      name: "Operations",
      colorKey: "ops",
      situation:
        "The process lives in one person's head and gets explained again every time someone new asks. **Documenting it keeps losing to doing it.**",
      detail:
        "Module 07 turns a process into a written SOP in one pass, then gives you the tools to find the constraint, prioritise fixes and stop the same failure recurring. Module 08 covers the calls that come out of it.",
      moduleRefs: [7, 8],
      promptRef: { module: 7, fileId: "01" },
    },
    {
      id: "people",
      number: "04",
      name: "People",
      colorKey: "people",
      situation:
        "Managers who were promoted for doing the work now run reviews, hiring loops and hard conversations. **Most of them are improvising, and the quality swings by manager.**",
      detail:
        "Module 06 covers the twelve that matter: goals, 1-on-1s, feedback, hiring filters, delegation, meeting design. Every manager runs the same structures, so an employee's experience stops depending on who they report to.",
      moduleRefs: [6, 10],
      promptRef: { module: 6, fileId: "05" },
    },
    {
      id: "leadership",
      number: "05",
      name: "Leadership",
      colorKey: "leadership",
      situation:
        "Each function reports the number it likes best, and the board deck is assembled from five different definitions of progress. **Nobody is lying; nobody is measuring the same thing either.**",
      detail:
        "Module 09 settles what the company counts and why. Module 01 is the one everybody reads first, because it is where the shared way of framing a question comes from in the first place.",
      moduleRefs: [9, 1],
      promptRef: { module: 9, fileId: "03" },
    },
  ] satisfies Department[],

  coverageKicker: "Coverage",
  coverageHeading: "Five functions. Ten modules. One book on every desk.",
  coverageP1:
    "No department gets a cut-down version. **The same 108 frameworks ship to everyone** — what differs is where each team starts reading.",
  coverageP2:
    "That is the whole mechanism. When sales, ops and marketing all frame a question the same way, their answers arrive in a shape the next person can actually use, and reviewing work stops being a rewrite.",

  rolloutKicker: "Rollout",
  rolloutHeading: "There is no deployment. It is a book.",
  rolloutSub:
    "No licences to provision, no seats to manage, no tool for IT to approve. Three steps and the team is running.",
  rolloutSteps: [
    {
      heading: "Order one per desk",
      body: "Ten copies or more are invoiced directly. The shared-language effect only works when everyone has their own copy open, not one circulating.",
    },
    {
      heading: "Everyone starts at their function",
      body: "Sales opens module 04, ops opens 07, managers open 06. Nobody reads front to back first — they read the module that matches this week.",
    },
    {
      heading: "The work starts matching",
      body: "Within a fortnight briefs, SOPs and proposals arrive in the same structure. That consistency is the return, not the prompts themselves.",
    },
  ],

  orderHeading: "One copy per desk beats one copy per office.",
  orderBody:
    "Tell us how many and where they are going. Bulk and institutional orders are handled directly by Raphy, invoiced, with no subscription attached.",
  orderFacts: [
    { value: "10+", label: "Copies, invoiced" },
    { value: "276", label: "Pages" },
  ],
  orderCardHeading: "What a bulk order includes",
  orderIncludes: [
    "Paperback copies, 276 pages, published by Notion Press",
    "Every QR code live on this site, free for every reader",
    "Prompts updated on the site as technique changes — no reprint",
    "Invoiced to the company, no per-seat licence or renewal",
  ],
  orderNote: "Contact form and ordering details to be added before launch",
};

export const FOR_INSTITUTIONS_CONTENT = {
  crumb: "For institutions",
  heroHeading: "Acquiring a book about AI is easy. Getting it borrowed is the hard part.",
  heroSub:
    "Most libraries already hold several. They go out of date, they read like commentary, and students cite them without opening them. This one is built to be opened mid-assignment, which is a different design problem entirely.",
  heroPrimaryCta: { label: "The three shelf tests", href: "#tests" },
  heroSecondaryCta: { label: "Where it fits in the syllabus", href: "#syllabus" },

  testsKicker: "The shelf test",
  testsHeading: "Three questions an acquisitions decision actually turns on.",
  testsSub:
    "Not whether the content is sound — plenty of it is. Whether the book gets taken down again after the first week.",
  shelfTests: [
    {
      colorKey: "blue" as const,
      tag: "The Tuesday test",
      question: "Is there a reason to open it on a Tuesday afternoon?",
      usual:
        "A book that explains a subject is read once, if at all. It competes with a lecture, a video and a search box, and it usually loses, because none of those require walking to a shelf.",
      answer: [
        "Every framework ends in a prompt the reader runs immediately, against their own assignment or case study. **The book is not the destination; it is the thing you consult on the way to finishing something.**",
        "That changes when it gets picked up. Not at the start of a course, but at the point a student is stuck on a specific question — which is the only moment a reference title earns its shelf space.",
      ],
      evidence: ["108 frameworks, each ending in a prompt", "Indexed by decision, not by chapter"],
    },
    {
      colorKey: "yellow" as const,
      tag: "The accuracy test",
      question: "Will it still be accurate at the end of the accession period?",
      usual:
        "This is where most AI titles fail. Technique moves faster than print, so a book bought today ends up carrying advice that is partly wrong — and nothing on the page tells a student which parts.",
      answer: [
        "Every framework in the printed book carries a QR code pointing at its own page on this site. **When a technique changes, that page is rewritten; the printed copy keeps working, because the code points at a page rather than at fixed text.**",
        "The shelf copy stays valid without a second edition and without a replacement purchase. What ages is the screen, and the screen is maintained.",
      ],
      evidence: ["Free to read, no account, no institutional licence", "Updated without reprinting"],
    },
    {
      colorKey: "green" as const,
      tag: "The faculty test",
      question: "Does a faculty member have a reason to point at it?",
      usual:
        "A title nobody assigns gets borrowed by nobody. Recommending a book usually means restructuring a session around it, which is why most recommendations never happen.",
      answer: [
        "The ten modules map onto courses already being taught — strategy, entrepreneurship, marketing, operations, organisational behaviour, finance. **A lecturer can point at one framework for one session without changing the syllabus around it.**",
        "It works as a companion to coursework rather than a replacement for a textbook, which is a far lower bar for a faculty member to clear.",
      ],
      evidence: ["Maps to 10 standard course areas", "Usable one framework at a time"],
    },
  ],

  mechKicker: "What a student actually does with it",
  mechHeading: "Four steps, and none of them are “read the chapter”.",
  mechP1:
    "A second-year student has a case study due and needs to show whether a business model holds. **They do not need a chapter on unit economics. They need to run one.**",
  mechP2:
    "The framework beside this text is what they scan to. It arrives on their phone with the brackets waiting to be filled with the case's own numbers, and it works in whichever model the institution permits.",
  mechSteps: [
    "Finds the framework in the index — **by the decision, not the chapter**",
    "Scans the code on that page with a phone camera",
    "Copies the prompt, fills the brackets with the case data",
    "Runs it, then **argues with the output** — which is the part being assessed",
  ],
  mechPromptRef: { module: 9, fileId: "01" } satisfies PromptRef,

  syllabusKicker: "Where it fits",
  syllabusHeading: "Ten modules against courses already on the timetable.",
  syllabusSub:
    "Nothing here needs a new paper or a syllabus revision. Each module sits alongside a course most management programmes already run.",
  syllabusNote:
    "Course names vary by programme — the mapping is indicative, not a claim of accreditation or endorsement by any institution.",
  /** module number -> the course area it's pitched as sitting alongside (editorial framing, not book content) */
  courseByModule: {
    1: "Strategic Management · Critical Thinking",
    2: "Entrepreneurship · New Venture Design",
    3: "Marketing Research · Competitive Strategy",
    4: "Sales & Distribution Management",
    5: "Marketing Management · Brand Management",
    6: "Organisational Behaviour · HRM",
    7: "Operations Management · Process Design",
    8: "Managerial Decision Making",
    9: "Financial Management · Business Analytics",
    10: "Leadership Development",
  } as Record<number, string>,

  editionKicker: "Accession",
  editionHeading: "One accession. No replacement edition scheduled.",
  editionParas: [
    "The usual pattern with a technology title is a purchase, a slow decline in accuracy, a withdrawal, and a repeat purchase of the next edition. **That cycle exists because the text and the advice are the same object.**",
    "Here they are separated. The printed frameworks — the reasoning, the structure, when to reach for which — do not change. The prompts do, and those live on a page behind a code.",
    "Which means the copy you catalogue this year is the copy that stays accurate, and no part of that depends on the library maintaining anything.",
  ],

  acquireHeading: "Library copies, department sets, reading-list orders.",
  acquireBody:
    "Tell us the institution, the number of copies and the department. Orders are handled directly by Raphy and invoiced — there is no platform, subscription or per-student licence attached.",
  acquireFacts: [
    { value: "10+", label: "Copies, invoiced" },
    { value: "276", label: "Pages" },
  ],
  acquireCardHeading: "What an institutional order includes",
  acquireIncludes: [
    "Paperback copies, 276 pages, published by Notion Press",
    "Every QR code live on this site, free for any reader, no login",
    "Prompts maintained on the site — no replacement edition to budget for",
    "Invoiced to the institution, no subscription or renewal",
  ],
  acquireNote: "Contact form and ordering details to be added before launch",
};

export interface TriageRoute {
  label: string;
  href: string;
  dead?: boolean;
}

export const CONTACT_CONTENT = {
  crumb: "Contact",
  heroHeading: "Most reasons to write are already answered on this page.",
  heroSub:
    "There is no support desk behind this book — there is one person. So the questions that can be answered once are settled below, in full, rather than queued. If yours is not one of them, the form is further down and it reaches him directly.",
  heroPrimaryCta: { label: "Read the three answers", href: "#answers" },
  heroSecondaryCta: { label: "Skip to the form", href: "#write" },

  answersKicker: "Before you write",
  answersHeading: "Three questions this page can settle without an email.",
  answersSub:
    "Each is answered in full below, with a link to the page that goes further. None of the three needs a form.",

  triage: [
    {
      colorKey: "blue" as const,
      tag: "Buying a copy",
      said: "“Where do I actually buy the book, and is there a digital version?”",
      meta: "Comes up for individual readers, and for managers buying two or three copies for a team.",
      answer: [
        "**The paperback is published by Notion Press — 276 pages, 108 frameworks across 10 modules.** It is sold through the usual retail listings, and the buying links on this site will point at them.",
        "For a single copy, buy it wherever you normally buy books. For ten or more — a team, a department, a library — the order goes directly through Raphy and is invoiced, because that is cheaper than retail and does not involve a licence, a platform or a per-seat fee.",
        "Whichever copy you end up with, everything behind the QR codes is free and needs no account. Buying more copies does not buy more access; it buys more copies.",
      ],
      routes: [
        { label: "Retail links added before launch", href: "#", dead: true },
        { label: "Team and bulk orders", href: "/for-business" },
        { label: "Library and department orders", href: "/for-institutions" },
      ] as TriageRoute[],
    },
    {
      colorKey: "yellow" as const,
      tag: "A prompt misbehaving",
      said: "“I ran the prompt and the answer was generic. Is the prompt wrong?”",
      meta: "Usually the same cause, and usually fixable in one edit.",
      answer: [
        "**A generic answer nearly always means the brackets were left as brackets.** Every prompt in the book is built around placeholders you replace with your own specifics — your numbers, your market, your constraint. Pasted unfilled, the model has nothing to work with, so it returns the average of everything it has read.",
        "The second most common cause is stopping at the first output. The frameworks are written to be argued with: push back once, name what is wrong, and run it again. That second pass is where the useful answer lives.",
        "Both of these, and the rest of the failure modes, are written out on the How To Use page — including what to do when a model refuses, truncates, or invents a figure.",
      ],
      routes: [
        { label: "Troubleshooting a prompt", href: "/how-to-use#trouble" },
        { label: "How to use the book", href: "/how-to-use" },
      ] as TriageRoute[],
    },
    {
      colorKey: "green" as const,
      tag: "Using it at work",
      said: "“Can I use these prompts with my team, or in a class I teach?”",
      meta: "Worth settling before you share a prompt internally, or put one on a slide.",
      answer: [
        "**Yes. Run the prompts at work, in class, in a workshop, in a client meeting.** There is no licence to buy, no seat count to declare and no account to create — the pages behind the QR codes are open to anyone who scans them.",
        "The one thing to keep straight is the difference between using a framework and republishing it. Running a prompt with your own data, teaching from it, or pointing people at the page it lives on is exactly what the book is for. Copying the text of the frameworks into your own paid course or product is a separate conversation, and that one does need an email.",
        "If your organisation needs something in writing before you can use it internally, say so in the form — that is exactly the kind of message worth sending.",
      ],
      routes: [
        { label: "Who it's for", href: "/who-its-for" },
        { label: "Ask about republishing", href: "#write" },
      ] as TriageRoute[],
    },
  ],

  whoKicker: "Who is at the other end",
  whoHeading: "One author, one inbox. Worth knowing before you write.",
  whoSub:
    "Everything on this site — the book, the pages behind the codes, the replies — comes from Raphy Varghese, the author. Knowing that changes which messages are worth sending.",
  willGet: {
    heading: "What you will get back",
    sub: "Things a single person can genuinely do",
    items: [
      "A reply from **the author**, not a ticket number or an autoresponder.",
      "A page **corrected** if you report a mistake — and the QR code in your printed copy then points at the fixed version.",
      "A **quote for copies**, invoiced to you or your institution, with nothing attached to it.",
      "A straight answer on whether the book covers what you need — **including when it doesn't**.",
    ],
  },
  wontGet: {
    heading: "What you won't",
    sub: "Not a policy — simply what one inbox cannot carry",
    items: [
      "A **prompt written for your specific case**. That is what the 108 frameworks are, and they are already yours.",
      "A review of **a business plan, a pitch deck or a financial model** sent as an attachment.",
      "A **promised reply date**. Some messages are answered quickly and some are not.",
      "A change to **what is printed** in a copy you already own — only the page behind the code can be rewritten.",
    ],
  },
  worthSendingTag: "The message worth sending",
  worthSending:
    "If you have found a mistake — a prompt that does not match its framework, a code that lands on the wrong page, a figure that looks wrong — **that message is worth more than almost anything else you could send**. It is the one kind that improves the copy sitting on everybody else's desk, not just your own: the page gets rewritten, and the code printed in every copy already sold starts pointing at the corrected version. Nobody has to buy anything again.",

  writeKicker: "Everything else",
  writeHeading: "What's left, and it goes straight to him.",
  writeSub:
    "Pick what it is about first — it changes what's useful to include, and the hint under the box will tell you what.",

  topics: [
    {
      value: "error",
      label: "A mistake on a page",
      hint: "**For a mistake:** give the module and lesson number printed beside the framework — for example 6.6 — and say what you expected to find. That is enough to fix it.",
      placeholder: "Module and lesson number, then what is wrong with it.",
    },
    {
      value: "bulk",
      label: "Copies for a team or library",
      hint: "**For copies:** the institution or company, how many copies, and the department. A quote comes back with an invoice, not a licence agreement.",
      placeholder: "How many copies, for whom, and where to invoice.",
    },
    {
      value: "speak",
      label: "Speaking or a workshop",
      hint: "**For speaking:** the date, the audience and roughly how long. Worth saying which modules matter most to them — it changes the answer.",
      placeholder: "Date, audience, length, and which modules matter to them.",
    },
    {
      value: "rights",
      label: "Republishing or licensing",
      hint: "**For republishing:** say where the text would appear and whether it is being sold. Teaching from the frameworks needs no permission; reprinting them does.",
      placeholder: "Where the frameworks would appear, and whether it is a paid product.",
    },
    {
      value: "other",
      label: "Something else",
      hint: "**Anything else:** one paragraph is plenty. If it is about a specific framework, the lesson number saves a round trip.",
      placeholder: "What you need, in a paragraph.",
    },
  ],
  formPendingNotice:
    "**This form is not connected yet.** The site is still being built, so nothing you type here is sent or stored anywhere. The reply address goes live with the book.",

  whatHappensHeading: "What happens to it",
  whatHappensSteps: [
    "It arrives in **one inbox** — no routing, no queue, no tier.",
    "Reported mistakes are checked **against the printed page** first.",
    "If a page needs rewriting, it is rewritten — **the code keeps working**.",
    "You get told what changed, **in a reply from a person**.",
  ],
  fasterHeading: "Faster than writing",
};

/**
 * The "faster than writing" aside links to three other pages inline in its
 * own sentences — genuinely mixed prose-and-links, not a list of fields —
 * so it's composed directly in ContactPage.tsx rather than forced into this
 * data shape. Kept as a short, clearly-commented exception rather than
 * inventing an awkward rich-text-with-links type for three lines of copy.
 */
