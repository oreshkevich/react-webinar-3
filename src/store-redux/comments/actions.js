export default {
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const response = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({ type: 'comments/load-success', payload: { data: response.data.result } });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  send: data => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/send-start' });

      try {
        const response = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        dispatch({ type: 'comments/send-success', payload: response.data.result });
      } catch (e) {
        dispatch({ type: 'comments/send-error' });
      }
    };
  },
};
