import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Github, Globe, Sun, Moon } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { projects } from '../data/projects';
import { GITHUB_URL } from '../data/site';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A route change should never leave the mobile sheet hanging open.
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const toggleLanguage = () => setLanguage(language === 'en' ? 'fr-CA' : 'en');

  const links = (
    <>
      <li>
        <NavLink to="/" end className="nav-link">
          {t('nav.home')}
        </NavLink>
      </li>
      {projects.map((p) => (
        <li key={p.id}>
          <NavLink to={`/${p.slug}`} className="nav-link">
            {p.title}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label="Alec Chamberland — home">
          <span className="logo-mark">AC</span>
          <span className="logo-word">Alec Chamberland</span>
        </Link>

        <ul className="nav-links desktop-only">{links}</ul>

        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={t('nav.toggleTheme')}
            title={t('nav.toggleTheme')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={toggleLanguage}
            className="icon-btn lang-btn"
            aria-label={t('nav.toggleLanguage')}
            title={language === 'en' ? 'Français' : 'English'}
          >
            <Globe size={18} />
            <span>{language === 'en' ? 'FR' : 'EN'}</span>
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn desktop-only"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <button
            className="icon-btn mobile-only"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label={t('nav.toggleMenu')}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <ul className="nav-links mobile-sheet">
          {links}
          <li>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              <Github size={17} /> {t('nav.github')}
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
