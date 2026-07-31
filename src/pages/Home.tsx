import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { projects } from '../data/projects';
import { GITHUB_URL, OWNER } from '../data/site';
import StatusPill from '../components/StatusPill';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-portrait">
          <img src="/alec-mini.png" alt={OWNER} width={148} height={148} />
        </div>
        <div>
          <span className="eyebrow">{t('home.role')}</span>
          <h1>
            {t('home.greeting')} <span className="gradient-text">{OWNER}</span>
          </h1>
          <p className="hero-statement">{t('home.statement')}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              {t('home.seeProjects')} <ArrowRight size={17} />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <Github size={17} /> {t('nav.github')}
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="section-head">
          <h2>{t('home.projects')}</h2>
          <span className="section-count">
            {projects.length} {t('home.shipped')}
          </span>
        </div>

        <div className="project-grid">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.id}
                to={`/${project.slug}`}
                className="project-card"
                style={{ ['--accent' as string]: `var(${project.accentVar})` }}
              >
                <div className="card-top">
                  <span className="card-mark">
                    {project.logoSrc ? (
                      <img src={project.logoSrc} alt="" width={22} height={22} />
                    ) : (
                      <Icon size={22} strokeWidth={2} />
                    )}
                  </span>
                  <StatusPill status={project.status} />
                </div>
                <h3>{project.title}</h3>
                <p className="card-desc">{t(`${project.id}.tagline`)}</p>
                <div className="chip-row">
                  <span className="chip">{project.engine}</span>
                  <span className="chip">{project.platform}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
