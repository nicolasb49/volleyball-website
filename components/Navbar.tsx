import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">SVK Volleyball</Link>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Men\u00fc"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <ul
          className={`${
            open ? 'block' : 'hidden'
          } absolute top-full left-0 w-full bg-black md:bg-transparent md:static md:flex md:space-x-6`}
        >
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-white/10"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/match-preview"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-white/10"
            >
              Spieltagsvorschau
            </Link>
          </li>
          <li>
            <Link
              href="/team"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-white/10"
            >
              Team
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
