import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import { useTranslate } from '../../language-store';
import './style.css';

function Menu() {
  const cn = bem('Menu');
  const t = useTranslate();

  return (
    <Link to={`/`} className={cn('link-back')}>
      <span>{t('main')}</span>
    </Link>
  );
}

export default memo(Menu);
