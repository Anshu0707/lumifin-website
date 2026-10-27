import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { getHelpCategories } from '../constants/helpCentre';
import { localizedPath } from '../utils/localizedPath';

const BASE = 'helpCentre';

/** Fold accents so "securite" matches "sécurité". */
const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

/**
 * The search box, and the results it produces. Lives on the help centre index
 * and on every category page, so a question can be found from wherever the
 * reader happens to be.
 *
 * Results link through to the category page rather than expanding in place:
 * a question only has one home, and that is where its neighbours are.
 */
export default function HelpSearch({ autoFocus = false }: { autoFocus?: boolean }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [query, setQuery] = useState('');

  const categories = useMemo(() => getHelpCategories(t), [t]);
  const q = norm(query);

  const results = useMemo(() => {
    if (q.length < 2) return null;
    const hits: { slug: string; category: string; id: string; question: string; answer: string }[] = [];
    for (const c of categories) {
      for (const a of c.articles) {
        // "Also asked as" is searched but never shown, so someone typing their
        // own phrasing still lands on the right answer.
        const haystack = norm(`${a.question} ${a.answer} ${a.aka}`);
        if (haystack.includes(q)) {
          hits.push({ slug: c.slug, category: c.title, id: a.id, question: a.question, answer: a.answer });
        }
      }
    }
    // Questions that match in the title itself come first.
    return hits.sort((a, b) => {
      const an = norm(a.question).includes(q) ? 0 : 1;
      const bn = norm(b.question).includes(q) ? 0 : 1;
      return an - bn;
    });
  }, [q, categories]);

  return (
    <div className="relative max-w-xl mx-auto">
      <Search
        className="absolute left-6 top-[1.6rem] -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
        aria-hidden="true"
      />
      <label htmlFor="help-search" className="sr-only">
        {t(`${BASE}.searchLabel`)}
      </label>
      <input
        id="help-search"
        type="search"
        role="searchbox"
        autoComplete="off"
        autoFocus={autoFocus}
        placeholder={t(`${BASE}.searchPlaceholder`)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
      />

      {results && (
        <div
          className="absolute z-30 mt-3 w-full max-h-[26rem] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl text-left"
          role="region"
          aria-live="polite"
        >
          {results.length === 0 ? (
            <p className="px-6 py-5 text-slate-500 font-medium">
              {t(`${BASE}.noResults`, { query })}
            </p>
          ) : (
            <>
              <p className="px-6 pt-4 pb-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                {t(`${BASE}.resultsCount`, { count: results.length })}
              </p>
              <ul>
                {results.slice(0, 20).map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`${localizedPath('/help', location.pathname)}/${r.slug}#${r.id}`}
                      className="block px-6 py-3 hover:bg-slate-50 border-t border-slate-100"
                      onClick={() => setQuery('')}
                    >
                      <span className="block text-[11px] font-black uppercase tracking-widest text-slate-400">
                        {r.category}
                      </span>
                      <span className="block font-bold text-slate-900">{r.question}</span>
                      <span className="block text-sm text-slate-500 font-medium line-clamp-1">
                        {r.answer}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
