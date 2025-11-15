import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../actions";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, user: null };
    default:
      return state;
  }
};

export { userReducer };
