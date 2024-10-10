import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentLayout({ children, count, t }) {
  const cn = bem('CommentLayout');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>
        {t('comments.title')} ({count})
      </h2>
      {children}
    </div>
  );
}

CommentLayout.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
  t: PropTypes.func,
};

export default memo(CommentLayout);
