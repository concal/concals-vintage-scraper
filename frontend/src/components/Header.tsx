import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/generated/components/ui/button';
import { cn } from '@/generated/lib/utils';

const NAV_LINKS = [
  { label: 'Browse', to: '/storefront' },
  { label: 'Saved', to: '/saved' },
];

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          Concal's Vintage Scraper
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <Button key={to} variant="ghost" size="sm" asChild>
              <Link
                to={to}
                className={cn(
                  pathname === to && 'font-semibold underline underline-offset-4'
                )}
              >
                {label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
