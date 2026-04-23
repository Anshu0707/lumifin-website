import React from 'react';
import { Linkedin } from 'lucide-react';

interface AuthorBioProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

const authors: Record<string, AuthorBioProps> = {
  'Gaurav Bansal': {
    name: 'Gaurav Bansal',
    role: 'COO, Lumifin',
    bio: 'Gaurav brings extensive experience in finance and international operations. He co-founded Lumifin to solve the cross-border payment challenges he experienced firsthand while travelling across Southeast Asia.',
    image: '/assets/team/GAURAV.webp',
    linkedin: 'https://www.linkedin.com/in/gaurav-b-52728b11/',
  },
  'Tanvi Nag': {
    name: 'Tanvi Nag',
    role: 'Product Analyst, Lumifin',
    bio: 'Tanvi focuses on user research and product strategy at Lumifin. She writes about the real-world payment challenges European travellers face in Southeast Asia.',
    image: '/assets/team/Tanvi-2.webp',
    linkedin: 'https://www.linkedin.com/in/tanvinag28/',
  },
  'Pierre Lahbabi': {
    name: 'Pierre Lahbabi',
    role: 'CEO, Lumifin',
    bio: 'Pierre is an École Polytechnique graduate with deep expertise in fintech and emerging markets. He founded Lumifin to bridge the gap between European travellers and local payment systems in Asia.',
    image: '/assets/team/PIERRE.webp',
    linkedin: 'https://www.linkedin.com/in/pierre-lahbabi/',
  },
};

export default function AuthorBio({ authorName }: { authorName: string }) {
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
        <p className="text-primary font-bold text-xs tracking-widest uppercase mt-1">{author.role}</p>
        <p className="text-slate-500 font-medium text-sm leading-relaxed mt-2">{author.bio}</p>
      </div>
    </div>
  );
}
