export const INITIAL_STATE = {
  isValid: {
    text: true,
    title: true,
    date: true,
  },
  values: {
    text: '',
    title: '',
    date: '',
    tag: '',
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, ...action.payload } };
    case 'CLEAR':
      return { ...state, values: INITIAL_STATE.values };
    case 'RESET_VALIDATION':
      return { ...state, isValid: INITIAL_STATE.isValid };
    case 'SUBMIT': {
      const titleValid = state.values.title?.trim() !== '';
      const textValid = state.values.text?.trim() !== '';
      const dateValid =
        state.values.date instanceof Date && !isNaN(state.values.date);

      return {
        ...state,
        isValid: {
          text: textValid,
          title: titleValid,
          date: dateValid,
        },
        isFormReadyToSubmit: titleValid && textValid && dateValid,
      };
    }
    default:
      return state;
  }
}
