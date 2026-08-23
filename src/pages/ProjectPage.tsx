import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Github, Shield } from 'lucide-react';
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

  useEffect(() => {
    // Some browsers return a Promise from scrollTo when `scroll-behavior:
    // smooth` is set (see globals.css); an effect must never implicitly
    // return that, or React tries to call it as the cleanup function on the
    // next render and throws.
    window.scrollTo(0, 0);
  }, [slug]);

  // Rendered in place rather than redirected: /:slug would match a /404 route
  // too, and the two would bounce off each other forever.
  if (!project) return <NotFound />;

  const Icon = project.icon;
  const features: string[] = t(`${project.id}.features`);
  const isLive = project.status === 'live';

  return (
    <article
      className="project-page"
      style={{ ['--accent' as string]: `var(${project.accentVar})` }}
    >
      <header className="project-hero">
        <span className="card-mark">
          {project.logoSrc ? (
            <img src={project.logoSrc} alt="" width={22} height={22} />
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

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="project-section screenshot-row">
          {project.screenshots.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </section>
      )}

      {/* Stands in for the gallery while a product has nothing to screenshot. */}
      {project.teaser && (
        <section className="project-section">
          <project.teaser />
        </section>
      )}

      {project.playUrl && (
        <section className="project-section">
          <a
            href={project.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={isLive ? 'play-badge' : 'play-badge play-badge-soon'}
          >
            <img
              src="/GetItOnGooglePlay_Badge_Web_color_English.png"
              alt={t('project.getItOnGooglePlay')}
            />
          </a>
          {!isLive && <p className="play-badge-caption">{t('project.joinClosedTesting')}</p>}
        </section>
      )}

      {project.githubUrl && (
        <section className="project-section">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Github size={17} /> {t('project.viewOnGithub')}
          </a>
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
        {/* Null until a product ships and there is a policy to serve. */}
        {project.privacyUrl && (
          <a
            href={project.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-text"
          >
            <Shield size={16} /> {t('project.privacyPolicy')}
          </a>
        )}
      </footer>
    </article>
  );
};

export default ProjectPage;
