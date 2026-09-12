/**
 * Shared primary navigation used by both the Header and Footer so the two
 * stay in sync. Add/remove routes here once — update once both nav's do.
 *
 * NOTE: only "/" exists today. The other routes will be built out in later
 * tasks (Portfolio, Services, About, Contact pages).
 */
export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
