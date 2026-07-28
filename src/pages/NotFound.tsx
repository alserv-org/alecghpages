import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="notfound">
      <h1 className="gradient-text">404</h1>
      <p>{t('notFound.message')}</p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={17} /> {t('notFound.back')}
      </Link>
    </div>
  );
};

export default NotFound;
