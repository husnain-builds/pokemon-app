import axios from "axios";
import {
  CLEAR_RESOURCES,
  GET_ALL_RESOURCES_SUCCESS,
  UPDATE_RESOURCE,
} from "../actions/index";

const getAllResources = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch({ type: GET_ALL_RESOURCES_SUCCESS, payload: response.data });
  } catch (error) {
    // dispatch({ type: GET_ALL_RESOURCES_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

const updateResource = (payload) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${payload.id}`,
      { id: payload.id, title: payload.title }
    );
    if (response.status === 200) {
      dispatch({
        type: UPDATE_RESOURCE,
        payload: { id: payload.id, title: payload.title },
      });
    }
  } catch (error) {
    // dispatch({ type: UPDATE_RESOURCE_FAILURE, payload: error.response.data });
    console.log(error);
  }
};

const clearResources = () => async (dispatch) => {
  dispatch({ type: CLEAR_RESOURCES });
};

export { getAllResources, updateResource, clearResources };
