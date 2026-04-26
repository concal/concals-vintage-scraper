import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/generated/components/ui/button';
import { cn } from '@/generated/lib/utils';
import { LoginDialog } from './LoginDialog';
import { useAuthContext } from '@/context/AuthContext';

const NAV_LINKS = [{ label: 'Browse', to: '/storefront' }];
const AUTHED_NAV_LINKS = [{ label: 'Saved', to: '/saved' }];

export function Header() {
  const { isAuthed, login, logout } = useAuthContext();
  const { pathname } = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          Concal's Vintage Scraper
        </Link>
        <nav className="flex items-center gap-1">
          {[...NAV_LINKS, ...(isAuthed ? AUTHED_NAV_LINKS : [])].map(({ label, to }) => (
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
          {isAuthed ? (
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setLoginOpen(true)}>
              Login
            </Button>
          )}
        </nav>
      </div>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} onLogin={login} />
    </header>
  );
}
