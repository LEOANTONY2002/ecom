export const open = () => (dispatch, getState) => {
  dispatch({ type: "MODEL_OPEN", payload: true });
  const {
    model: { open },
  } = getState();
  console.log(open);
};

export const close = () => (dispatch) => {
  dispatch({ type: "MODEL_OPEN", payload: false });
};
