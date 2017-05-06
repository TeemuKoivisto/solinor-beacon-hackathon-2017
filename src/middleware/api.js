
const createRequest = (action, store) => {

  const request = action.payload.request;

  return fetch(request.url,
  {
    method: request.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request.data)
  })
  .then(res => {
    const newAction = {
      type: action.type + "_SUCCESS",
      payload: res.data || request.data,
    }
    store.dispatch(newAction);
    return newAction;
  })
  .catch(err => {
    const newAction = {
      type: action.type + "_FAILURE",
      error: err,
    }
    store.dispatch(newAction);
    return newAction;
  });
};

export const handleRequest = store => next => action => {
  next(action);
  if (action.payload && action.payload.request) {
    return createRequest(action, store);
  }
};