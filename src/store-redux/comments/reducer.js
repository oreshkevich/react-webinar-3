const initialState = {
  comments: [],
  count: 0,
  newCommentId: '',
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
    case 'comments/send-start':
      return { ...state, waiting: true };

    case 'comments/load-success':
      return {
        ...state,
        comments: action.payload.data.items,
        count: action.payload.data.count,
        waiting: false,
      };

    case 'comments/load-error':
    case 'comments/send-error':
      return { ...state, waiting: false };

    case 'comments/send-success':
      return {
        ...state,
        comments: [...state.comments, action.payload],
        count: state.count + 1,
        waiting: false,
      };

    default:
      return state;
  }
}

export default reducer;
