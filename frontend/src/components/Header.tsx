import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="flex flex-row justify-between sticky top-0 py-4 px-10 bg-stone-400 text-stone-900 z-10000">
      <Link to="/">
        <h1>Concal's Vintage Scraper</h1>
      </Link>
      <Link to="/saved">
        <h1>Saved</h1>
      </Link>
    </header>
  );
}
