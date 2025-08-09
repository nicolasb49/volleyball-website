import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-xl border-b border-orange-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-xl font-bold tracking-wider">SVK VOLLEYBALL</div>
            <div className="text-xs text-orange-400 tracking-wide">BEIERTHEIM</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="relative px-4 py-2 text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-300 group"
          >
            HOME
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/match-preview"
            className="relative px-4 py-2 text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-300 group"
          >
            SPIELTAGSVORSCHAU
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/table"
            className="relative px-4 py-2 text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-300 group"
          >
            TABELLE
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/team"
            className="relative px-4 py-2 text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-300 group"
          >
            STECKBRIEF SPIELERINNEN
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <div className="relative w-6 h-6 transform transition-transform duration-300">
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/95 backdrop-blur-lg border-t border-orange-500/30`}
      >
        <ul className="py-4 space-y-2">
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium tracking-wide hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300 border-l-4 border-transparent hover:border-orange-500"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              href="/match-preview"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium tracking-wide hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300 border-l-4 border-transparent hover:border-orange-500"
            >
              SPIELTAGSVORSCHAU
            </Link>
          </li>
          <li>
            <Link
              href="/table"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium tracking-wide hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300 border-l-4 border-transparent hover:border-orange-500"
            >
              TABELLE
            </Link>
          </li>
          <li>
            <Link
              href="/team"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium tracking-wide hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300 border-l-4 border-transparent hover:border-orange-500"
            >
              STECKBRIEF SPIELERINNEN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
