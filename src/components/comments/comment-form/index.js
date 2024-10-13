import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({
  activeCommentId: commentId,
  lastChildCommentId: lastChildId,
  userId,
  activeCommentAuthor,
  onCancelClick: handleCancelClick,
  onSendComment: handleSendComment,
  t,
}) {
  const cn = bem('CommentForm');
  const [message, setMessage] = useState(
    commentId ? `Мой ответ для ${activeCommentAuthor} ` : 'Текст',
  );

  const isSignedIn = Boolean(userId);

  const handleCancel = () => {
    setMessage('');
    handleCancelClick();
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (message.trim()) {
      handleSendComment(message);
      setMessage('');
    }
  };

  return (
    <div className={cn('', { displaced: commentId === lastChildId })}>
      {isSignedIn ? (
        <form
          onSubmit={handleSubmit}
          className={cn('', {
            shifted: commentId === lastChildId,
            active: Boolean(commentId),
          })}
        >
          <fieldset className={cn('fieldset')}>
            <legend className={cn('legend')}>
              {commentId ? t('comments.newAnswer') : t('comments.newComment')}
            </legend>
            <textarea
              className={cn('textarea')}
              rows="5"
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
            <div className={cn('buttons')}>
              <button className={cn('submit')} type="submit" disabled={!message?.trim()}>
                {t('comments.send')}
              </button>
              {commentId && (
                <button className={cn('cancelButton')} type="button" onClick={handleCancel}>
                  {t('comments.cancel')}
                </button>
              )}
            </div>
          </fieldset>
        </form>
      ) : (
        <div
          className={cn('', {
            shifted: commentId === lastChildId,
            active: Boolean(commentId),
          })}
        >
          <Link className={cn('login')} to="/login" state={{ back: location.pathname }}>
            {t('comments.login')}
          </Link>
          {', '}
          {commentId ? t('comments.toComment') : t('comments.toAnswer')}
          {commentId && (
            <button className={cn('cancelLink')} type="button" onClick={handleCancel}>
              {t('comments.cancel')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  activeCommentId: PropTypes.string,
  lastChildCommentId: PropTypes.string,
  userId: PropTypes.string,
  onCancelClick: PropTypes.func,
  onSendComment: PropTypes.func,
  activeCommentAuthor: PropTypes.string,
  t: PropTypes.func,
};

export default memo(CommentForm);
