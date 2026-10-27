import type { TFunction } from 'i18next';

/**
 * Help centre structure. Each category is its own page at /help/<slug>.
 *
 * Article ids come from two places: the FAQ bank (A1, E2, P7 …) and the
 * site's own earlier answers (q1, q2 …), which were folded into the same
 * taxonomy so there is one set of categories rather than two. The text for
 * both lives in the locale files, under helpCentre.articles.
 *
 * `icon` names a lucide-react icon, resolved in the page components.
 */
export interface HelpCategory {
  slug: string;
  icon: string;
  articleIds: string[];
}

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    slug: "about-lumi",
    icon: "Info",
    articleIds: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "q1", "q17"],
  },
  {
    slug: "eligibility-and-sign-up",
    icon: "UserCheck",
    articleIds: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "q18"],
  },
  {
    slug: "identity-verification",
    icon: "BadgeCheck",
    articleIds: ["V1", "V2", "V3", "V4", "q10", "q11"],
  },
  {
    slug: "login-and-security",
    icon: "Lock",
    articleIds: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "q9"],
  },
  {
    slug: "adding-money",
    icon: "Wallet",
    articleIds: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "q7", "q19", "q21"],
  },
  {
    slug: "paying-by-qr",
    icon: "QrCode",
    articleIds: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "q3", "q4", "q8", "q14"],
  },
  {
    slug: "where-lumi-works",
    icon: "Globe",
    articleIds: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "q2", "q20"],
  },
  {
    slug: "fees-and-rates",
    icon: "Percent",
    articleIds: ["R1", "R2", "R3", "R4", "R5", "R6", "q5", "q6"],
  },
  {
    slug: "limits",
    icon: "Gauge",
    articleIds: ["L1", "L2", "L3", "L5", "L6"],
  },
  {
    slug: "payment-problems",
    icon: "AlertCircle",
    articleIds: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "q15"],
  },
  {
    slug: "withdrawals",
    icon: "ArrowDownToLine",
    articleIds: ["WD1", "WD2", "WD3", "WD4", "q12", "q13"],
  },
  {
    slug: "rewards-and-referrals",
    icon: "Gift",
    articleIds: ["RW2", "RW3", "RW4", "RW5", "RW6", "RW7", "RW10", "RW11", "RW12"],
  },
  {
    slug: "esim-and-extras",
    icon: "Smartphone",
    articleIds: ["X1", "X2", "X3", "X4", "X5", "X6"],
  },
  {
    slug: "managing-your-account",
    icon: "Settings",
    articleIds: ["M1", "M2", "M3", "M4", "M5", "M6"],
  },
  {
    slug: "safety-and-regulation",
    icon: "ShieldCheck",
    articleIds: ["G1", "G2", "G4", "G5", "G6", "G8", "G9", "q16"],
  },
  {
    slug: "contacting-support",
    icon: "MessageCircle",
    articleIds: ["C1", "C2", "C3", "C4", "C5", "C6"],
  },
];

export interface HelpArticle {
  id: string;
  question: string;
  answer: string;
  /** Other phrasings of the same question; searched, never displayed. */
  aka: string;
}

export interface ResolvedCategory {
  slug: string;
  icon: string;
  title: string;
  desc: string;
  articles: HelpArticle[];
}

/** Resolve one category into the active language. */
export function resolveCategory(t: TFunction, c: HelpCategory): ResolvedCategory {
  return {
    slug: c.slug,
    icon: c.icon,
    title: t(`helpCentre.categories.${c.slug}.title`),
    desc: t(`helpCentre.categories.${c.slug}.desc`),
    articles: c.articleIds.map((id) => {
      // The site's own answers (q1, q2 …) keep living under faqs.*, where they
      // are already translated; only the FAQ-bank articles are duplicated into
      // helpCentre.articles.
      const fromSite = /^q[0-9]+$/.test(id);
      const base = fromSite ? `faqs.${id}` : `helpCentre.articles.${id}`;
      return {
        id,
        question: t(fromSite ? `${base}.question` : `${base}.q`),
        answer: t(fromSite ? `${base}.answer` : `${base}.a`),
        aka: t(`${base}.aka`, { defaultValue: '' }),
      };
    }),
  };
}

/** Every category, in the active language. */
export function getHelpCategories(t: TFunction): ResolvedCategory[] {
  return HELP_CATEGORIES.map((c) => resolveCategory(t, c));
}

export function findCategory(slug: string | undefined): HelpCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.slug === slug);
}
