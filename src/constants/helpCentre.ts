import type { TFunction } from 'i18next';

/**
 * Help centre structure: which questions sit under which category, and in what
 * order. The questions themselves live in the `faqs` block of each locale file,
 * so a category is only a grouping — replacing the content means editing the
 * locale files and this list, not the page.
 *
 * `icon` names a lucide-react icon, resolved in HelpCentrePage.
 */
export interface HelpCategory {
  key: string;
  icon: string;
  questionKeys: string[];
}

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    key: 'gettingStarted',
    icon: 'Rocket',
    questionKeys: ['q1', 'q18', 'q17'],
  },
  {
    key: 'paying',
    icon: 'QrCode',
    questionKeys: ['q3', 'q2', 'q4', 'q8', 'q15', 'q20'],
  },
  {
    key: 'feesRates',
    icon: 'Percent',
    questionKeys: ['q6', 'q5', 'q21'],
  },
  {
    key: 'moneyInOut',
    icon: 'Wallet',
    questionKeys: ['q7', 'q19', 'q12', 'q13'],
  },
  {
    key: 'accountVerification',
    icon: 'ShieldCheck',
    questionKeys: ['q10', 'q11', 'q14'],
  },
  {
    key: 'security',
    icon: 'Lock',
    questionKeys: ['q9', 'q16'],
  },
];

export interface HelpArticle {
  id: string;
  question: string;
  answer: string;
}

export interface ResolvedCategory {
  key: string;
  icon: string;
  title: string;
  desc: string;
  articles: HelpArticle[];
}

/** Resolve the structure above into the active language. */
export function getHelpCategories(t: TFunction): ResolvedCategory[] {
  return HELP_CATEGORIES.map((c) => ({
    key: c.key,
    icon: c.icon,
    title: t(`helpCentre.categories.${c.key}.title`),
    desc: t(`helpCentre.categories.${c.key}.desc`),
    articles: c.questionKeys.map((id) => ({
      id,
      question: t(`faqs.${id}.question`),
      answer: t(`faqs.${id}.answer`),
    })),
  }));
}
