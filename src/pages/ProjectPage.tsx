import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Shield } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { projectBySlug } from '../data/projects';
import StatusPill from '../components/StatusPill';
import NotFound from './NotFound';

/**
 * One page for every product — content comes from data/projects.ts plus the
 * matching namespace in the locale files. Adding a product means adding an
 * entry there, not a new component.
 */
const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const project = slug ? projectBySlug(slug) : undefined;

  useEffect(() => window.scrollTo(0, 0), [slug]);

  // Rendered in place rather than redirected: /:slug would match a /404 route
  // too, and the two would bounce off each other forever.
  if (!project) return <NotFound />;

  const Icon = project.icon;
  const features: string[] = t(`${project.id}.features`);

  return (
    <article
      className="project-page"
      style={{ ['--accent' as string]: `var(${project.accentVar})` }}
    >
      <header className="project-hero">
        <span className={project.iconUrl ? 'card-mark card-mark-img' : 'card-mark'}>
          {project.iconUrl ? (
            <img src={project.iconUrl} alt="" width={42} height={42} loading="eager" />
          ) : (
            <Icon size={22} strokeWidth={2} />
          )}
        </span>
        <h1>{project.title}</h1>
        <p className="project-tagline">{t(`${project.id}.tagline`)}</p>
        <div className="project-hero-meta">
          <StatusPill status={project.status} />
          <span className="chip">{project.engine}</span>
          <span className="chip">{project.platform}</span>
        </div>
      </header>

      {project.playUrl && (
        <section className="project-section">
          <a
            href={project.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="play-badge"
          >
            <img
              src="/GetItOnGooglePlay_Badge_Web_color_English.png"
              alt={t('project.getItOnGooglePlay')}
            />
          </a>
        </section>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="project-section">
          <h2>{t('project.screenshots')}</h2>
          {/* Horizontal scroller rather than a grid: these are 16:9 landscape
              frames, and stacking them full-width on a phone buries everything
              below the fold. */}
          <ul className="shot-strip">
            {project.screenshots.map((shot) => (
              <li key={shot.src}>
                <img
                  src={shot.src}
                  alt={t(`${project.id}.${shot.captionKey}`)}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
                <span>{t(`${project.id}.${shot.captionKey}`)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="project-section">
        <h2>{t('project.about')}</h2>
        <p>{t(`${project.id}.description`)}</p>
      </section>

      <section className="project-section">
        <h2>{t('project.features')}</h2>
        <ul className="feature-list">
          {Array.isArray(features) &&
            features.map((feature, i) => (
              <li key={i}>
                <Check size={17} strokeWidth={2.5} />
                <span>{feature}</span>
              </li>
            ))}
        </ul>
      </section>

      <section className="project-section">
        <h2>{t('project.details')}</h2>
        <dl className="spec-grid">
          <div className="spec">
            <dt>{t('project.platform')}</dt>
            <dd>{project.platform}</dd>
          </div>
          <div className="spec">
            <dt>{t('project.engine')}</dt>
            <dd>{project.engine}</dd>
          </div>
          <div className="spec">
            <dt>{t('project.status')}</dt>
            <dd>{t(`status.${project.status}`)}</dd>
          </div>
        </dl>
      </section>

      <footer className="project-foot">
        <Link to="/" className="btn-text">
          <ArrowLeft size={16} /> {t('project.back')}
        </Link>
        <a
          href={project.privacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-text"
        >
          <Shield size={16} /> {t('project.privacyPolicy')}
        </a>
      </footer>
    </article>
  );
};

export default ProjectPage;
