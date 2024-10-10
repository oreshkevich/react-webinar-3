import { React, memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

import CommentItem from '../comment-item';

function CommentList({
  comments,
  activeCommentId,
  newCommentId,
  userId,
  onAnswerClick,
  onCancelClick,
  onSendComment,
  onSignIn,
  t,
}) {
  const cn = bem('CommentList');
  const lastChildCommentIndex = comments.findIndex(
    comment => comment.parent._id === activeCommentId,
  );
  const lastChildCommentId =
    lastChildCommentIndex === -1 ? activeCommentId : comments[lastChildCommentIndex]._id;

  return (
    <ul className={cn()}>
      {comments.map(comment => (
        <CommentItem
          key={comment._id}
          comment={comment}
          activeCommentId={activeCommentId}
          lastChildCommentId={lastChildCommentId}
          newCommentId={newCommentId}
          userId={userId}
          onAnswerClick={onAnswerClick}
          onCancelClick={onCancelClick}
          onSendComment={onSendComment}
          onSignIn={onSignIn}
          t={t}
        />
      ))}
    </ul>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  activeCommentId: PropTypes.string,
  newCommentId: PropTypes.string,
  userId: PropTypes.string,
  onAnswerClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  onSignIn: PropTypes.func,
  t: PropTypes.func,
};

export default memo(CommentList);
