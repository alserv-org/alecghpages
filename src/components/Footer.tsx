import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Coffee } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { projects } from '../data/projects';
import { GITHUB_URL, KOFI_URL, OWNER } from '../data/site';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-mark">AC</span>
          <p>{t('footer.blurb')}</p>
        </div>

        <nav className="footer-col" aria-label={t('footer.projects')}>
          <h3>{t('footer.projects')}</h3>
          <ul>
            {projects.map((p) => (
              <li key={p.id}>
                <Link to={`/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label={t('footer.elsewhere')}>
          <h3>{t('footer.elsewhere')}</h3>
          <ul>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github size={15} /> {t('nav.github')}
              </a>
            </li>
            <li>
              <a href={KOFI_URL} target="_blank" rel="noopener noreferrer">
                <Coffee size={15} /> Ko-fi
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer-base">
        <p>
          © {year} {OWNER}
        </p>
        <p>{t('footer.privacyNote')}</p>
      </div>
    </footer>
  );
};

export default Footer;
