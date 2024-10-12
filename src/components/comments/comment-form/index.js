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
  onSignIn: handleSignIn,
  t,
}) {
  const cn = bem('CommentForm');
  const [message, setMessage] = useState('');

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
        <form onSubmit={handleSubmit}>
          <fieldset className={cn('fieldset')}>
            <legend className={cn('legend')}>
              {commentId ? t('comments.newAnswer') : t('comments.newComment')}
            </legend>
            <textarea
              className={cn('textarea')}
              rows="5"
              value={message}
              onChange={event => setMessage(event.target.value)}
              placeholder={commentId ? `Мой ответ для ${activeCommentAuthor} ` : 'Текст'}
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
        <div>
          <Link className={cn('login')} to="/login" onClick={handleSignIn}>
            {t('comments.login')}
          </Link>{' '}
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
  onSignIn: PropTypes.func,
  t: PropTypes.func,
};

export default memo(CommentForm);
