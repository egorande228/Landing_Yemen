import {
  localizeContentLinks,
  localizeHomeContentLinks,
  type YemenLocale,
} from "@/lib/locale";
import type { MarketContent, PlayerHomeContent } from "@/schemas/landing";

const yemenLinks = {
  play: "https://refpa3665.com/L?tag=d_4092175m_66329c_MLBYemen26",
  partner: "https://t.me/Teamcash_GULFcountries",
  whatsapp: "https://t.me/Teamcash_GULFcountries",
  telegram: "https://t.me/Teamcash_GULFcountries",
  applyWhatsapp: "mailto:PAYPARTNERS-MIDDLEAST@MELBET.COM",
  applyTelegram: "https://t.me/Teamcash_GULFcountries",
  email: "mailto:PAYPARTNERS-MIDDLEAST@MELBET.COM",
};

const sharedFooterByLocale: Record<YemenLocale, MarketContent["footer"]> = {
  en: {
    brand: "Yemen Market",
    homeLabel: "Home",
    homeLinks: [
      { label: "Overview", href: "/#top" },
      { label: "Games", href: "/#games" },
      { label: "Sports", href: "/#sports" },
      { label: "What we offer", href: "/#offers" },
    ],
    partnershipLabel: "Partnership",
    partnershipLinks: [
      { label: "Why Us", href: "/partnership#benefits" },
      { label: "Onboarding", href: "/partnership#steps" },
      { label: "Models", href: "/partnership#paths" },
      { label: "Reporting", href: "/partnership#tools" },
    ],
    contactLabel: "Contact",
    legal: "Copyright 2026 Yemen Market. All rights reserved.",
    contactLinks: [
      { label: "Mail", href: yemenLinks.email },
      { label: "Contact on Telegram", href: yemenLinks.telegram },
    ],
  },
  ar: {
    brand: "سوق اليمن",
    homeLabel: "الرئيسية",
    homeLinks: [
      { label: "نظرة عامة", href: "/#top" },
      { label: "الألعاب", href: "/#games" },
      { label: "الرياضات", href: "/#sports" },
      { label: "عروضنا", href: "/#offers" },
    ],
    partnershipLabel: "الشراكات",
    partnershipLinks: [
      { label: "لماذا نحن", href: "/partnership#benefits" },
      { label: "التهيئة", href: "/partnership#steps" },
      { label: "النماذج", href: "/partnership#paths" },
      { label: "التقارير", href: "/partnership#tools" },
    ],
    contactLabel: "التواصل",
    legal: "جميع الحقوق محفوظة 2026 لسوق اليمن.",
    contactLinks: [
      { label: "Mail", href: yemenLinks.email },
      { label: "تواصل عبر تيليجرام", href: yemenLinks.telegram },
    ],
  },
};

const yemenPartnershipByLocale: Record<YemenLocale, MarketContent> = {
  en: {
    seo: {
      title: "Yemen Partnerships | Market Entry, Partners & Agents",
      description:
        "Launch Yemen partnerships with tighter onboarding, disciplined reporting, and serious commercial support for partners and agents.",
    },
    nav: {
      brand: {
        eyebrow: "Yemen",
        title: "Market",
        href: "/",
        logoSrc: "/logo.svg",
        logoAlt: "Yemen Market",
      },
      items: [
        {
          label: "Home",
          href: "/",
          children: [
            { label: "Overview", href: "/#top" },
            { label: "Games", href: "/#games" },
            { label: "Sports", href: "/#sports" },
            { label: "What we offer", href: "/#offers" },
          ],
        },
        {
          label: "Partnership",
          href: "/partnership",
          children: [
            { label: "Overview", href: "/partnership#top" },
            { label: "Why Us", href: "/partnership#benefits" },
            { label: "Onboarding", href: "/partnership#steps" },
            { label: "Models", href: "/partnership#paths" },
            { label: "Reporting", href: "/partnership#tools" },
            { label: "Contact", href: "/partnership#final-cta" },
          ],
        },
      ],
      primaryCta: { label: "Apply for partnership", href: "/partnership#final-cta" },
    },
    hero: {
      eyebrow: "Yemen Partnerships",
      title: "A stricter partnership route for launching inside Yemen.",
      highlightedWords: ["stricter partnership route"],
      body:
        "Built for partners and agents who need faster qualification, more accountable reporting, and direct launch support when entering or expanding in Yemen.",
      primaryCta: { label: "Apply for partnership", href: yemenLinks.partner },
      secondaryCta: { label: "Review partnership models", href: "/partnership#paths" },
      stats: [
        {
          label: "qualification window",
          value: "24h",
          numericValue: 24,
          suffix: "h",
          note: "for qualified submissions",
        },
        {
          label: "reporting cycle",
          value: "7d",
          numericValue: 7,
          suffix: "d",
          note: "structured weekly review",
        },
        {
          label: "launch routes",
          value: "2",
          numericValue: 2,
          note: "partner and agent paths",
        },
      ],
      stage: {
        eyebrow: "Executive view",
        title: "Operational control for partners entering a live market",
        badge: "Yemen launch corridor",
        metrics: [
          {
            label: "readiness score",
            value: "92%",
            numericValue: 92,
            suffix: "%",
            note: "commercial qualification benchmark",
          },
          {
            label: "response time",
            value: "17m",
            numericValue: 17,
            suffix: "m",
            note: "support median",
          },
        ],
        lanes: [
          {
            label: "Partner onboarding",
            value: 79,
            note: "commercial review, reporting setup, and launch materials",
          },
          {
            label: "Agent activation",
            value: 64,
            note: "network-led rollout with direct support coordination",
          },
        ],
        note:
          "This route is built for market-entry work where approval, reporting, and support need to stay accountable from day one.",
      },
    },
    benefits: {
      eyebrow: "Why partners choose this route",
      title: "A cleaner partnership setup for launching in Yemen and managing it with confidence.",
      body:
        "From onboarding and reporting to day-to-day support, the process is designed to keep your launch moving and give you a clearer view of performance once you are live.",
      items: [
        {
          title: "Hands-on launch support",
          body: "Move from review to go-live with one coordinated process. Qualification, setup, and rollout support stay aligned so your team is not chasing updates across different people.",
          icon: "support",
        },
        {
          title: "Reporting you can actually use",
          body: "See approval status, source quality, and payout progress in a format that is clear enough for commercial review and useful enough for day-to-day decisions.",
          icon: "reporting",
        },
        {
          title: "Responsive partner support",
          body: "Work with a team that understands launch pressure, answers quickly, and knows when to step in before small issues slow the route down.",
          icon: "payouts",
        },
        {
          title: "Clear commercial terms",
          body: "Commission logic, reporting cadence, and launch expectations are agreed early, so both sides know how the partnership works as volume grows.",
          icon: "creative",
        },
        {
          title: "Faster escalation when needed",
          body: "When something needs approval, follow-up, or a quick commercial decision, the route is already structured so it reaches the right person without delay.",
          icon: "support",
        },
      ],
    },
    steps: {
      eyebrow: "Onboarding",
      title: "A simple three-step onboarding flow.",
      body:
        "We keep the process straightforward so qualified partners can move quickly while staying clear on what happens next.",
      items: [
        {
          step: "01",
          title: "Submit the partnership profile",
          body: "Share your operating model, traffic or network profile, and launch expectations so the team can place you in the right route immediately.",
        },
        {
          step: "02",
          title: "Complete commercial review",
          body: "Receive the correct partnership model, reporting access, and launch materials after qualification and support review.",
        },
        {
          step: "03",
          title: "Launch with reporting in place",
          body: "Go live with clearer reporting, direct support, and a defined operating rhythm from the first active cycle.",
        },
      ],
    },
    paths: {
      eyebrow: "Partnership models",
      title: "Choose the partnership model that fits your business.",
      body:
        "Whether you work as an affiliate partner or through an agent network, the setup is built around how you acquire players, manage reporting, and grow the route.",
      items: [
        {
          type: "partner",
          eyebrow: "Partner route",
          title: "Affiliate partner",
          body: "For digital partners, media buyers, communities, and introducers that need cleaner onboarding and stronger reporting discipline.",
          bullets: [
            "Launch support tied to source review and reporting readiness",
            "Clear payout structure with commercial follow-through",
            "Built for performance-led partnership growth",
          ],
          primaryCta: { label: "Apply as a partner", href: yemenLinks.partner },
          secondaryCta: { label: "View reporting", href: "/partnership#tools" },
        },
        {
          type: "agent",
          eyebrow: "Agent route",
          title: "Agent model",
          body: "For operators building through direct relationships, local activation, and network-led acquisition that needs faster operational support.",
          bullets: [
            "Agent onboarding with defined commercial review",
            "Support path built around launch, reporting, and escalation",
            "Structured for retention and controlled route expansion",
          ],
          primaryCta: { label: "Apply as an agent", href: yemenLinks.whatsapp },
          secondaryCta: { label: "Contact online", href: "/partnership#final-cta" },
        },
      ],
    },
    tools: {
      eyebrow: "Planning and reporting",
      title: "Plan the route before launch, then review it with clearer numbers.",
      body:
        "Use the calculator as a practical planning view for traffic, first depositors, and player value before you launch in Yemen.",
      stats: [
        {
          label: "tracked segments",
          value: "12",
          numericValue: 12,
          note: "visible inside one reporting layer",
        },
        {
          label: "payout readiness",
          value: "91%",
          numericValue: 91,
          suffix: "%",
          note: "operational benchmark",
        },
        {
          label: "support routes",
          value: "2",
          numericValue: 2,
          note: "partner and agent models",
        },
      ],
      panel: {
        eyebrow: "Planning model",
        title: "Route estimate",
        badge: "Illustrative projection",
        summaryItems: [
          { label: "Review lane", value: "Qualified traffic" },
          { label: "Payout view", value: "Weekly clear" },
          { label: "Support mode", value: "Partner or agent" },
        ],
      },
      calculator: {
        roleOptions: ["Partner", "Agent"],
        inputs: [
          {
            key: "monthlyTraffic",
            label: "Qualified traffic per month",
            min: 1500,
            max: 40000,
            step: 500,
            defaultValue: 8500,
          },
          {
            key: "firstDepositors",
            label: "First depositors per month",
            min: 20,
            max: 1400,
            step: 10,
            defaultValue: 210,
          },
          {
            key: "avgPlayerValue",
            label: "Average monthly value per player",
            min: 30,
            max: 320,
            step: 5,
            defaultValue: 95,
            prefix: "$",
          },
        ],
        outputs: [
          {
            key: "monthlyRevenue",
            label: "Estimated monthly revenue",
            prefix: "$",
          },
          {
            key: "weeklyClear",
            label: "Projected weekly clear",
            prefix: "$",
          },
          {
            key: "annualRunRate",
            label: "Annualized run rate",
            prefix: "$",
          },
        ],
        note:
          "Illustrative planning estimate based on qualified traffic, depositor volume, and monthly player value.",
      },
    },
    finalCta: {
      eyebrow: "Apply online",
      title: "Start your application.",
      body: "Choose Mail or Telegram to apply.",
      helperText: "Pick the channel that suits you best and send your request directly from there.",
      primary: { label: "Mail", href: yemenLinks.applyWhatsapp },
      secondary: { label: "Apply", href: yemenLinks.applyTelegram },
    },
    footer: sharedFooterByLocale.en,
  },
  ar: {
    seo: {
      title: "شراكات اليمن | الشركاء والوكلاء ودعم الإطلاق",
      description:
        "أطلق شراكات السوق في اليمن عبر مسار أكثر انضباطاً في التأهيل والتقارير والدعم التجاري للشركاء والوكلاء.",
    },
    nav: {
      brand: {
        eyebrow: "اليمن",
        title: "السوق",
        href: "/",
        logoSrc: "/logo.svg",
        logoAlt: "سوق اليمن",
      },
      items: [
        {
          label: "الرئيسية",
          href: "/",
          children: [
            { label: "نظرة عامة", href: "/#top" },
            { label: "الألعاب", href: "/#games" },
            { label: "الرياضات", href: "/#sports" },
            { label: "ما نقدمه", href: "/#offers" },
          ],
        },
        {
          label: "الشراكات",
          href: "/partnership",
          children: [
            { label: "نظرة عامة", href: "/partnership#top" },
            { label: "لماذا نحن", href: "/partnership#benefits" },
            { label: "التهيئة", href: "/partnership#steps" },
            { label: "النماذج", href: "/partnership#paths" },
            { label: "التقارير", href: "/partnership#tools" },
            { label: "التواصل", href: "/partnership#final-cta" },
          ],
        },
      ],
      primaryCta: { label: "قدّم للشراكة", href: "/partnership#final-cta" },
    },
    hero: {
      eyebrow: "شراكات اليمن",
      title: "مسار أكثر انضباطاً للشراكات داخل اليمن.",
      highlightedWords: ["أكثر انضباطاً"],
      body:
        "مخصص للشركاء والوكلاء الذين يحتاجون إلى تأهيل أسرع، وتقارير أكثر وضوحاً، ودعم إطلاق مباشر عند دخول السوق أو التوسع داخله.",
      primaryCta: { label: "قدّم للشراكة", href: yemenLinks.partner },
      secondaryCta: { label: "راجع نماذج الشراكة", href: "/partnership#paths" },
      stats: [
        {
          label: "نافذة التأهيل",
          value: "24h",
          numericValue: 24,
          suffix: "h",
          note: "للطلبات المؤهلة",
        },
        {
          label: "دورة التقارير",
          value: "7d",
          numericValue: 7,
          suffix: "d",
          note: "مراجعة أسبوعية منظمة",
        },
        {
          label: "مسارات الإطلاق",
          value: "2",
          numericValue: 2,
          note: "شريك ووكيل",
        },
      ],
      stage: {
        eyebrow: "واجهة تنفيذية",
        title: "تحكم تشغيلي للشركاء الداخلين إلى سوق حي",
        badge: "مسار إطلاق اليمن",
        metrics: [
          {
            label: "مؤشر الجاهزية",
            value: "92%",
            numericValue: 92,
            suffix: "%",
            note: "مقياس التأهيل التجاري",
          },
          {
            label: "زمن الاستجابة",
            value: "17m",
            numericValue: 17,
            suffix: "m",
            note: "متوسط الدعم",
          },
        ],
        lanes: [
          {
            label: "تهيئة الشريك",
            value: 79,
            note: "مراجعة تجارية وإعداد التقارير ومواد الإطلاق",
          },
          {
            label: "تفعيل الوكيل",
            value: 64,
            note: "تشغيل قائم على الشبكات مع تنسيق دعم مباشر",
          },
        ],
        note:
          "هذا المسار مبني لأعمال دخول السوق حيث يجب أن تبقى الموافقة والتقارير والدعم قابلة للمراجعة منذ اليوم الأول.",
      },
    },
    benefits: {
      eyebrow: "لماذا يفضل الشركاء هذا المسار",
      title: "مسار شراكة أوضح للإطلاق في اليمن وإدارة العمل بثقة.",
      body:
        "من التهيئة والتقارير إلى المتابعة اليومية، تم تصميم هذا المسار ليساعدك على الإطلاق بسرعة أكبر مع رؤية أوضح للأداء بعد بدء التشغيل.",
      items: [
        {
          title: "دعم مباشر عند الإطلاق",
          body: "انتقل من المراجعة إلى التشغيل عبر مسار واحد منظم. التأهيل والإعداد ودعم الإطلاق يبقون منسقين حتى لا يضيع فريقك بين أطراف متعددة.",
          icon: "support",
        },
        {
          title: "تقارير واضحة وقابلة للاستخدام",
          body: "تابع حالة الاعتماد وجودة المصادر وحالة الدفعات في صيغة تساعدك على المراجعة التجارية واتخاذ القرار اليومي بسهولة.",
          icon: "reporting",
        },
        {
          title: "دعم سريع للشركاء",
          body: "تواصل مع فريق يفهم ضغط الإطلاق، يرد بسرعة، ويعرف متى يتدخل قبل أن تتحول التفاصيل الصغيرة إلى تعطيل فعلي.",
          icon: "payouts",
        },
        {
          title: "شروط تجارية واضحة",
          body: "تتضح آلية العمولة ودورة التقارير وتوقعات الإطلاق من البداية، حتى يعرف كل طرف كيف يسير التعاون مع نمو الحجم.",
          icon: "creative",
        },
        {
          title: "تصعيد أسرع عند الحاجة",
          body: "إذا احتاج الأمر إلى موافقة أو متابعة أو قرار تجاري سريع، فالمسار منظم مسبقاً ليصل الطلب إلى الشخص المناسب دون تأخير.",
          icon: "support",
        },
      ],
    },
    steps: {
      eyebrow: "التهيئة",
      title: "ثلاث خطوات فقط وبإيقاع مضغوط.",
      body:
        "تم ضغط مسار التهيئة عمداً حتى تتحرك مناقشات دخول السوق بسرعة دون خسارة الوضوح أو البنية.",
      items: [
        {
          step: "01",
          title: "إرسال ملف الشراكة",
          body: "شارك نموذج عملك وطبيعة المرور أو الشبكة وتوقعات الإطلاق حتى يضعك الفريق في المسار المناسب مباشرة.",
        },
        {
          step: "02",
          title: "إتمام المراجعة التجارية",
          body: "بعد التأهيل ومراجعة الدعم تحصل على نموذج الشراكة المناسب والوصول إلى التقارير ومواد الإطلاق.",
        },
        {
          step: "03",
          title: "الإطلاق مع وجود التقارير",
          body: "ابدأ التشغيل مع تقارير أوضح ودعم مباشر وإيقاع عمل محدد منذ أول دورة فعالة.",
        },
      ],
    },
    paths: {
      eyebrow: "نماذج الشراكة",
      title: "اختر المسار الذي يطابق طريقة عملك.",
      body:
        "العرض التجاري في اليمن واضح: تدخل إما كشريك أفلييت أو كوكيل، مع تقارير ودعم متوافقين مع هذا النموذج.",
      items: [
        {
          type: "partner",
          eyebrow: "مسار الشريك",
          title: "شريك أفلييت",
          body: "للشركاء الرقميين وفرق الشراء الإعلامي والمجتمعات والمُحيلين الذين يحتاجون إلى تهيئة أنظف وانضباط أعلى في التقارير.",
          bullets: [
            "دعم إطلاق مرتبط بمراجعة المصادر وجاهزية التقارير",
            "هيكل دفعات أوضح مع متابعة تجارية مباشرة",
            "مصمم لنمو الشراكات القائمة على الأداء",
          ],
          primaryCta: { label: "قدّم كشريك", href: yemenLinks.partner },
          secondaryCta: { label: "عرض التقارير", href: "/partnership#tools" },
        },
        {
          type: "agent",
          eyebrow: "مسار الوكيل",
          title: "نموذج الوكيل",
          body: "للمشغلين الذين يبنون النمو عبر العلاقات المباشرة والتفعيل المحلي والشبكات التي تحتاج إلى دعم تشغيلي أسرع.",
          bullets: [
            "تهيئة للوكلاء مع مراجعة تجارية محددة",
            "مسار دعم مبني حول الإطلاق والتقارير والتصعيد",
            "مهيأ للاحتفاظ والتوسع المنضبط لاحقاً",
          ],
          primaryCta: { label: "قدّم كوكيل", href: yemenLinks.whatsapp },
          secondaryCta: { label: "تواصل أونلاين", href: "/partnership#final-cta" },
        },
      ],
    },
    tools: {
      eyebrow: "التقارير والتخطيط",
      title: "قدّر المسار قبل الإطلاق ثم راجعه بأرقام أكثر إحكاماً.",
      body:
        "استخدم الحاسبة كأداة تخطيط للشركاء والوكلاء لتقدير المرور المؤهل وقيمة اللاعب وانضباط التقارير قبل الإطلاق.",
      stats: [
        {
          label: "القطاعات المتتبعة",
          value: "12",
          numericValue: 12,
          note: "مرئية داخل طبقة تقارير واحدة",
        },
        {
          label: "جاهزية الدفعات",
          value: "91%",
          numericValue: 91,
          suffix: "%",
          note: "مؤشر تشغيلي",
        },
        {
          label: "مسارات الدعم",
          value: "2",
          numericValue: 2,
          note: "شريك ووكيل",
        },
      ],
      panel: {
        eyebrow: "نموذج التخطيط",
        title: "تقدير المسار",
        badge: "توقع توضيحي",
        summaryItems: [
          { label: "مسار المراجعة", value: "مرور مؤهل" },
          { label: "رؤية الدفعات", value: "تصفية أسبوعية" },
          { label: "نمط الدعم", value: "شريك أو وكيل" },
        ],
      },
      calculator: {
        roleOptions: ["شريك", "وكيل"],
        inputs: [
          {
            key: "monthlyTraffic",
            label: "المرور المؤهل شهرياً",
            min: 1500,
            max: 40000,
            step: 500,
            defaultValue: 8500,
          },
          {
            key: "firstDepositors",
            label: "المودعون لأول مرة شهرياً",
            min: 20,
            max: 1400,
            step: 10,
            defaultValue: 210,
          },
          {
            key: "avgPlayerValue",
            label: "متوسط قيمة اللاعب شهرياً",
            min: 30,
            max: 320,
            step: 5,
            defaultValue: 95,
            prefix: "$",
          },
        ],
        outputs: [
          {
            key: "monthlyRevenue",
            label: "الإيراد الشهري التقديري",
            prefix: "$",
          },
          {
            key: "weeklyClear",
            label: "التصفية الأسبوعية المتوقعة",
            prefix: "$",
          },
          {
            key: "annualRunRate",
            label: "المعدل السنوي",
            prefix: "$",
          },
        ],
        note:
          "تقدير تخطيطي يعتمد على المرور المؤهل وعدد المودعين ومتوسط قيمة اللاعب شهرياً.",
      },
    },
    finalCta: {
      eyebrow: "قدّم أونلاين",
      title: "ابدأ طلبك.",
      body: "اختر البريد أو تيليجرام للتقديم.",
      helperText: "اختر القناة الأنسب لك وأرسل طلبك مباشرة، وسنتابع معك من هناك.",
      primary: { label: "Mail", href: yemenLinks.applyWhatsapp },
      secondary: { label: "قدّم", href: yemenLinks.applyTelegram },
    },
    footer: sharedFooterByLocale.ar,
  },
};

const yemenHomeByLocale: Record<YemenLocale, PlayerHomeContent> = {
  en: {
    seo: {
      title: "Yemen Market | Trending Games, Sports, and Live Action",
      description:
        "Discover trending games, top sports, fast access, and live player value on the Yemen market home page.",
    },
    nav: {
      brand: {
        eyebrow: "Yemen",
        title: "Market",
        href: "/",
        logoSrc: "/logo.svg",
        logoAlt: "Yemen Market",
      },
      items: yemenPartnershipByLocale.en.nav.items,
      primaryCta: { label: "Open player access", href: yemenLinks.play },
    },
    hero: {
      eyebrow: "Play without waiting",
      title: "Play the games and sports moving fastest in Yemen.",
      highlightedWords: ["games and sports"],
      body:
        "The home page is built for players: faster discovery, stronger live signals, and a cleaner route into the titles, leagues, and promos getting the most attention right now.",
      primaryCta: { label: "Open player access", href: yemenLinks.play },
      secondaryCta: { label: "See trending games", href: "/#games" },
      stats: [
        {
          label: "live picks",
          value: "18",
          numericValue: 18,
          note: "updated around the active board",
        },
        {
          label: "top leagues",
          value: "9",
          numericValue: 9,
          note: "football and fast-market coverage",
        },
        {
          label: "cashier speed",
          value: "24h",
          numericValue: 24,
          suffix: "h",
          note: "fast review on successful requests",
        },
      ],
      highlights: [
        "Trending games refreshed daily",
        "Live sports focus with rapid market changes",
        "Arabic-ready support and fast mobile flow",
      ],
      spotlight: {
        eyebrow: "Tonight's board",
        title: "Most active player lanes",
        badge: "Live trend snapshot",
        items: [
          {
            title: "Crash rounds",
            value: "2.4x",
            note: "highest session momentum",
            tone: "accent",
          },
          {
            title: "Football accumulators",
            value: "34%",
            note: "share of active multi-bet slips",
          },
          {
            title: "Fast basketball",
            value: "12",
            note: "live markets drawing repeat play",
          },
        ],
      },
    },
    trendingGames: {
      eyebrow: "Trending games",
      title: "The titles pulling players back onto the board.",
      body:
        "Fast sessions, clearer momentum, and easy entry. The game mix is built to feel current rather than crowded.",
      items: [
        {
          eyebrow: "High velocity",
          title: "Crash",
          badge: "Hot",
          body: "Fast-entry rounds with instant cashout decisions and strong repeat-session momentum.",
          metrics: ["Live rounds", "Rapid cashout", "Top clicks"],
        },
        {
          eyebrow: "Fast reels",
          title: "Turbo slots",
          badge: "Rising",
          body: "Short-session slots that fit mobile play and quick promo-driven entries.",
          metrics: ["Quick spins", "Mobile-first", "Promo ready"],
        },
        {
          eyebrow: "Competitive play",
          title: "Penalty duel",
          badge: "Featured",
          body: "Simple football-style head-to-head play that stays readable even at speed.",
          metrics: ["Easy entry", "Short sessions", "Live focus"],
        },
        {
          eyebrow: "Table action",
          title: "Blackjack live",
          badge: "Trusted",
          body: "A cleaner live-table route for players who want steadier rhythm and clearer odds.",
          metrics: ["Live tables", "Sharp pace", "Trusted format"],
        },
      ],
    },
    trendingSports: {
      eyebrow: "Trending sports",
      title: "The sports categories carrying the most player energy.",
      body:
        "Football remains the anchor, but fast-market sports and short-cycle events keep the page broader and more discoverable.",
      items: [
        {
          title: "Football",
          badge: "Top market",
          body: "League and accumulator action with fast shifts around matchday peaks.",
          tags: ["Live matches", "Accumulators", "Top leagues"],
        },
        {
          title: "Basketball",
          badge: "Fast lines",
          body: "Shorter windows, rapid totals movement, and strong in-play interest.",
          tags: ["Live pace", "Quarter markets", "Quick updates"],
        },
        {
          title: "Tennis",
          badge: "In play",
          body: "Point-by-point movement for players who want tighter live momentum and shorter exposure.",
          tags: ["Set markets", "Live turns", "Sharp reads"],
        },
        {
          title: "Combat nights",
          badge: "Weekend lift",
          body: "Event-led spikes that support promo drops and curated headline action.",
          tags: ["Event spikes", "Promo hooks", "Headline cards"],
        },
      ],
    },
    promos: {
      eyebrow: "What we offer",
      title: "Offer layers and platform edges that keep the page active.",
      body:
        "Promos are presented as player momentum tools, not loud banner clutter, so the page stays energetic without losing control.",
      items: [
        {
          title: "Night reload drop",
          badge: "Daily",
          body: "Timed reload support tied to evening activity when the live board is strongest.",
          tags: ["Evening push", "Fast claim", "Mobile ready"],
        },
        {
          title: "Accumulator boost",
          badge: "Football",
          body: "Extra lift on multi-bet slips when matchday traffic is peaking.",
          tags: ["Matchday", "Multi-bet", "Higher upside"],
        },
        {
          title: "Fast-play missions",
          badge: "Games",
          body: "Short-cycle missions that keep casual sessions active without overloading the home page.",
          tags: ["Short tasks", "Quick wins", "Light friction"],
        },
        {
          title: "Cashier confidence",
          badge: "Platform",
          body: "Clearer payout and access guidance so players understand the route before they commit.",
          tags: ["Support cues", "Clear timing", "Trust layer"],
        },
      ],
    },
    finalCta: {
      eyebrow: "Start now",
      title: "Open Yemen player access and step straight onto the live board.",
      body:
        "Use the player route for the games, sports, and offers trending right now, then move into the sections that match your pace.",
      primary: { label: "Open player access", href: yemenLinks.play },
      secondary: { label: "Review top games", href: "/#games" },
    },
    footer: sharedFooterByLocale.en,
  },
  ar: {
    seo: {
      title: "سوق اليمن | الألعاب والرياضات الرائجة والحركة المباشرة",
      description:
        "اكتشف الألعاب الرائجة والرياضات الأكثر نشاطاً والوصول السريع والقيمة المباشرة للاعبين على الصفحة الرئيسية لسوق اليمن.",
    },
    nav: {
      brand: {
        eyebrow: "اليمن",
        title: "السوق",
        href: "/",
        logoSrc: "/logo.svg",
        logoAlt: "سوق اليمن",
      },
      items: yemenPartnershipByLocale.ar.nav.items,
      primaryCta: { label: "افتح وصول اللاعبين", href: yemenLinks.play },
    },
    hero: {
      eyebrow: "العب بدون انتظار",
      title: "العب الألعاب والرياضات الأسرع حركة في اليمن.",
      highlightedWords: ["الألعاب والرياضات"],
      body:
        "الصفحة الرئيسية مخصصة للاعبين: اكتشاف أسرع، إشارات مباشرة أوضح، ومسار أنظف نحو العناوين والدوريات والعروض التي تحظى بأكبر اهتمام الآن.",
      primaryCta: { label: "افتح وصول اللاعبين", href: yemenLinks.play },
      secondaryCta: { label: "شاهد الألعاب الرائجة", href: "/#games" },
      stats: [
        {
          label: "اختيارات مباشرة",
          value: "18",
          numericValue: 18,
          note: "يتم تحديثها حول اللوحة النشطة",
        },
        {
          label: "أهم الدوريات",
          value: "9",
          numericValue: 9,
          note: "كرة قدم وأسواق سريعة",
        },
        {
          label: "سرعة الكاشير",
          value: "24h",
          numericValue: 24,
          suffix: "h",
          note: "مراجعة سريعة على الطلبات الناجحة",
        },
      ],
      highlights: [
        "تحديث يومي للألعاب الرائجة",
        "تركيز على الرياضات المباشرة والأسواق السريعة",
        "دعم جاهز للعربية ومسار جوال سريع",
      ],
      spotlight: {
        eyebrow: "لوحة الليلة",
        title: "أكثر مسارات اللاعبين نشاطاً",
        badge: "لقطة مباشرة",
        items: [
          {
            title: "جولات كراش",
            value: "2.4x",
            note: "أعلى زخم للجلسات",
            tone: "accent",
          },
          {
            title: "تجميعات كرة القدم",
            value: "34%",
            note: "حصة القسائم النشطة متعددة الرهانات",
          },
          {
            title: "كرة السلة السريعة",
            value: "12",
            note: "أسواق مباشرة تجذب اللعب المتكرر",
          },
        ],
      },
    },
    trendingGames: {
      eyebrow: "الألعاب الرائجة",
      title: "العناوين التي تعيد اللاعبين إلى اللوحة.",
      body:
        "جلسات أسرع وزخم أوضح ودخول أسهل. مزيج الألعاب مصمم ليبدو حاضراً لا مزدحماً.",
      items: [
        {
          eyebrow: "سرعة عالية",
          title: "كراش",
          badge: "الأكثر حرارة",
          body: "جولات سريعة بدخول فوري وقرارات سحب سريعة مع زخم قوي للجلسات المتكررة.",
          metrics: ["جولات مباشرة", "سحب سريع", "أعلى نقرات"],
        },
        {
          eyebrow: "لفات سريعة",
          title: "سلوتس تيربو",
          badge: "صاعد",
          body: "ألعاب سلوت قصيرة الجلسة تناسب اللعب من الجوال والدخول السريع المرتبط بالعروض.",
          metrics: ["لفات سريعة", "أولوية للجوال", "جاهزة للعروض"],
        },
        {
          eyebrow: "لعب تنافسي",
          title: "ركلات الترجيح",
          badge: "مميز",
          body: "تنسيق بسيط بطابع كرة القدم يظل واضحاً حتى مع السرعة.",
          metrics: ["دخول سهل", "جلسات قصيرة", "تركيز مباشر"],
        },
        {
          eyebrow: "طاولات مباشرة",
          title: "بلاك جاك لايف",
          badge: "موثوق",
          body: "مسار أوضح للطاولات المباشرة للاعبين الذين يريدون إيقاعاً أكثر ثباتاً واحتمالات أوضح.",
          metrics: ["طاولات مباشرة", "إيقاع حاد", "تنسيق موثوق"],
        },
      ],
    },
    trendingSports: {
      eyebrow: "الرياضات الرائجة",
      title: "فئات الرياضة التي تحمل أكبر طاقة للاعبين.",
      body:
        "تبقى كرة القدم هي الأساس، لكن الرياضات السريعة والأحداث القصيرة تجعل الصفحة أوسع وأكثر قابلية للاكتشاف.",
      items: [
        {
          title: "كرة القدم",
          badge: "أعلى سوق",
          body: "حركة دوريات وتجميعات مع تحولات سريعة حول ذروة أيام المباريات.",
          tags: ["مباريات مباشرة", "تجميعات", "أهم الدوريات"],
        },
        {
          title: "كرة السلة",
          badge: "خطوط سريعة",
          body: "نوافذ أقصر وتحرك سريع للمجاميع واهتمام قوي أثناء اللعب.",
          tags: ["إيقاع مباشر", "أسواق الأرباع", "تحديثات سريعة"],
        },
        {
          title: "التنس",
          badge: "أثناء اللعب",
          body: "حركة نقطة بنقطة للاعبين الذين يريدون زخمًا مباشراً وإطاراً زمنياً أقصر.",
          tags: ["أسواق المجموعات", "تحولات مباشرة", "قراءة حادة"],
        },
        {
          title: "ليالي القتال",
          badge: "ذروة نهاية الأسبوع",
          body: "قفزات مدفوعة بالأحداث تدعم العروض والحركة الرئيسية المنتقاة.",
          tags: ["قفزات الحدث", "ربط العروض", "بطاقات رئيسية"],
        },
      ],
    },
    promos: {
      eyebrow: "العروض والمزايا",
      title: "عروض وحواف تشغيلية تبقي الصفحة نشطة.",
      body:
        "تُعرض العروض كأدوات لزخم اللاعب لا كبانرات صاخبة، لذلك تبقى الصفحة نشطة دون أن تفقد السيطرة.",
      items: [
        {
          title: "إعادة شحن ليلية",
          badge: "يومي",
          body: "دعم موقّت لإعادة الشحن مرتبط بالفترة المسائية عندما تكون اللوحة المباشرة في أقوى حالاتها.",
          tags: ["دفعة مسائية", "استلام سريع", "جاهز للجوال"],
        },
        {
          title: "تعزيز التجميعات",
          badge: "كرة القدم",
          body: "رفع إضافي على القسائم متعددة الرهانات عندما يبلغ المرور ذروته في أيام المباريات.",
          tags: ["يوم المباراة", "متعدد الرهانات", "فرصة أعلى"],
        },
        {
          title: "مهام اللعب السريع",
          badge: "الألعاب",
          body: "مهام قصيرة الدورة تُبقي الجلسات الخفيفة نشطة دون إرهاق الصفحة الرئيسية.",
          tags: ["مهام قصيرة", "مكاسب سريعة", "احتكاك منخفض"],
        },
        {
          title: "ثقة الكاشير",
          badge: "المنصة",
          body: "إرشادات أوضح للدفع والوصول حتى يفهم اللاعب المسار قبل الالتزام.",
          tags: ["إشارات دعم", "توقيت واضح", "طبقة ثقة"],
        },
      ],
    },
    finalCta: {
      eyebrow: "ابدأ الآن",
      title: "افتح وصول اللاعبين في اليمن وادخل مباشرة إلى اللوحة المباشرة.",
      body:
        "استخدم مسار اللاعبين للوصول إلى الألعاب والرياضات والعروض الرائجة الآن ثم انتقل إلى الأقسام التي تناسب سرعتك.",
      primary: { label: "افتح وصول اللاعبين", href: yemenLinks.play },
      secondary: { label: "راجع أهم الألعاب", href: "/#games" },
    },
    footer: sharedFooterByLocale.ar,
  },
};

export function getYemenContent(locale: YemenLocale) {
  return localizeContentLinks(yemenPartnershipByLocale[locale], locale);
}

export function getYemenHomeContent(locale: YemenLocale) {
  return localizeHomeContentLinks(yemenHomeByLocale[locale], locale);
}
