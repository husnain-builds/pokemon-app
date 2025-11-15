import { INCREMENT, DECREMENT } from "./index";

const increment = () => async (dispatch) => {
  dispatch({ type: INCREMENT });
};

const decrement = () => async (dispatch) => {
  dispatch({ type: DECREMENT });
};

export { increment, decrement };
