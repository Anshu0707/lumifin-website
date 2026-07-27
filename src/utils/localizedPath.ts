/**
 * Prefix a root-relative internal path with /en when the given pathname is
 * on the English site, so in-app navigation stays on the same language
 * instead of dropping the visitor back into French. Pass the CURRENT
 * location.pathname (from useLocation()) as the second argument.
 *
 * Leaves hash-only fragments ("/#waitlist") and paths with no English
 * route (e.g. "/tools/currency-converter") to be handled by the caller —
 * this only does the prefixing; callers decide which paths to pass in.
 */
export function localizedPath(path: string, currentPathname: string): string {
  const isEnglish = currentPathname === "/en" || currentPathname.startsWith("/en/");
  if (!isEnglish) return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path}`;
  return `/en${path}`;
}
