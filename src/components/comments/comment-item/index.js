import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../../utils/date-format';
import './style.css';

import CommentForm from '../comment-form';

function CommentItem({
  comment,
  activeCommentId,
  lastChildCommentId,
  newCommentId,
  userId,
  onAnswerClick,
  onCancelClick,
  onSendComment,
  t,
}) {
  const cn = bem('CommentItem');
  const MAX_LEVEL = 6;
  const PAD_SIZE = 30;

  const isCommentNew = newCommentId === comment._id;
  const isSelf = userId === comment.author._id;

  return (
    <li
      className={cn({ new: isCommentNew })}
      style={{
        marginLeft: `${Math.min(comment.level, MAX_LEVEL) * PAD_SIZE}px`,
      }}
    >
      <div className={cn('info')}>
        <span className={cn('user', { self: isSelf })}>{comment.author.profile.name}</span>
        <span className={cn('created')}>{formatDate(comment.dateCreate)}</span>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button className={cn('answer')} onClick={() => onAnswerClick(comment._id)}>
        {t('comments.answer')}
      </button>
      {lastChildCommentId === comment._id && (
        <CommentForm
          userId={userId}
          activeCommentId={activeCommentId}
          lastChildCommentId={lastChildCommentId}
          activeCommentAuthor={comment.author.profile.name}
          onCancelClick={onCancelClick}
          onSendComment={onSendComment}
          t={t}
        />
      )}
    </li>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  activeCommentId: PropTypes.string,
  lastChildCommentId: PropTypes.string,
  newCommentId: PropTypes.string,
  userId: PropTypes.string,
  onAnswerClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  t: PropTypes.func,
};
export default memo(CommentItem);
