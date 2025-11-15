import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from ".";

const login = (payload) => async (dispatch) => {
  try {
    // const response = await axios.post("http://localhost:5000/login", payload);
    // if (response.status === 200) {
    //   dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    // }
    if (!localStorage.getItem("name") && !localStorage.getItem("email")) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Please enter your name and email",
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
        },
      });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

const signup = (payload) => async (dispatch) => {
  try {
    localStorage.setItem("name", payload.name);
    localStorage.setItem("email", payload.email);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { name: payload.name, email: payload.email },
    });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

export { login, signup };
