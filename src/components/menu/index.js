import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Menu({ elements }) {
  const cn = bem('Menu');

  return (
    <>
      {elements.map(item => (
        <Link key={item.key} to={item.link} className={cn('link-back')}>
          <span>{item.title}</span>
        </Link>
      ))}
    </>
  );
}

export default memo(Menu);
