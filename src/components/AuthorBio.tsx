import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin } from 'lucide-react';

interface AuthorMeta {
  name: string;
  i18nKey: string;
  image: string;
  linkedin: string;
}

const authors: Record<string, AuthorMeta> = {
  'Gaurav Bansal': {
    name: 'Gaurav Bansal',
    i18nKey: 'gaurav',
    image: '/assets/team/GAURAV.webp',
    linkedin: 'https://www.linkedin.com/in/gaurav-b-52728b11/',
  },
  'Tanvi Nag': {
    name: 'Tanvi Nag',
    i18nKey: 'tanvi',
    image: '/assets/team/Tanvi-2.webp',
    linkedin: 'https://www.linkedin.com/in/tanvinag28/',
  },
  'Pierre Lahbabi': {
    name: 'Pierre Lahbabi',
    i18nKey: 'pierre',
    image: '/assets/team/PIERRE.webp',
    linkedin: 'https://www.linkedin.com/in/pierre-lahbabi/',
  },
};

export default function AuthorBio({ authorName }: { authorName: string }) {
  const { t } = useTranslation();
  const author = authors[authorName];
  if (!author) return null;

  return (
    <div className="mt-16 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <img
        src={author.image}
        alt={author.name}
        loading="lazy"
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0"
      />
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <h3 className="text-lg font-black text-slate-900">{author.name}</h3>
          <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
        <p className="text-primary font-bold text-xs tracking-widest uppercase mt-1">{t(`authors.${author.i18nKey}.role`)}</p>
        <p className="text-slate-500 font-medium text-sm leading-relaxed mt-2">{t(`authors.${author.i18nKey}.bio`)}</p>
      </div>
    </div>
  );
}
