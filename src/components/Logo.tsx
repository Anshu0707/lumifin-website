import React from 'react';
import logoSrc from '../../lumifin_logo.svg';

export default function Logo({ className = "w-32 h-auto" }: { className?: string }) {
  return (
    <div className={`${className} relative z-10 flex items-center`}>
      <img
        src={logoSrc}
        alt="Lumifin"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
