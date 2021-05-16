export const openReducer = (state = {}, action) => {
  switch (action.type) {
    case "MODEL_OPEN":
      return { open: action.payload };

    case "MODEL_CLOSE":
      return { open: action.payload };

    default:
      return { open: false };
  }
};
