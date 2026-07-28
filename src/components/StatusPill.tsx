import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import type { Status } from '../data/projects';

const StatusPill: React.FC<{ status: Status }> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <span className={`status status-${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {t(`status.${status}`)}
    </span>
  );
};

export default StatusPill;
