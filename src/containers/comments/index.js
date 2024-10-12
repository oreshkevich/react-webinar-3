import { memo, useState, React, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

import CommentLayout from '../../components/comments/comment-layout';
import CommentList from '../../components/comments/comment-list';
import CommentForm from '../../components/comments/comment-form';

function Comments() {
  const [activeCommentId, setActiveCommentId] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const selectStore = useSelector(state => ({
    userId: state.session.user._id,
  }));

  const selectRedux = useSelectorRedux(
    state => ({
      articleId: state.article.data._id,
      comments: state.comments.comments,
      commentsCount: state.comments.count,
      newCommentId: state.comments.newCommentId,
    }),
    shallowequal,
  );
  const callbacks = {
    onAnswerClick: id => setActiveCommentId(id),
    onCancelClick: () => setActiveCommentId(''),
    onSendComment: message => {
      const type = activeCommentId ? 'comment' : 'article';
      dispatch(
        commentsActions.send({
          text: message,
          parent: { _id: activeCommentId || selectRedux.articleId, _type: type },
        }),
      );
    },
    onSignIn: () => navigate('/login', { state: { back: location.pathname } }),
  };

  useEffect(() => {
    const newComment = document.querySelector('.CommentItem_new');
    if (newComment) {
      newComment.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }, []);

  const newComments = useMemo(
    () =>
      treeToList(listToTree(selectRedux.comments, selectRedux.articleId), (item, level) => ({
        ...item,
        level,
      })),
    [selectRedux.comments],
  );

  return (
    <CommentLayout count={selectRedux.commentsCount} t={t}>
      <CommentList
        comments={newComments}
        activeCommentId={activeCommentId}
        newCommentId={selectRedux.newCommentId}
        userId={selectStore.userId}
        onAnswerClick={callbacks.onAnswerClick}
        onCancelClick={callbacks.onCancelClick}
        onSendComment={callbacks.onSendComment}
        onSignIn={callbacks.onSignIn}
        t={t}
      />
      {!activeCommentId && (
        <CommentForm
          userId={selectStore.userId}
          onSignIn={callbacks.onSignIn}
          onSendComment={callbacks.onSendComment}
          t={t}
        />
      )}
    </CommentLayout>
  );
}

export default memo(Comments);
