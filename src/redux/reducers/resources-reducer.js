import {
  CLEAR_RESOURCES,
  GET_ALL_RESOURCES_SUCCESS,
  UPDATE_RESOURCE,
} from "../actions/index";

const initialState = {
  resources: [],
  loading: false,
  error: null,
};

const resourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RESOURCES_SUCCESS:
      return { ...state, resources: action.payload };
    case UPDATE_RESOURCE:
      return {
        ...state,
        resources: state.resources.map((resource) =>
          resource.id === action.payload.id
            ? { ...resource, title: action.payload.title }
            : resource
        ),
      };

    case CLEAR_RESOURCES:
      return { ...state, resources: [] };
    default:
      return state;
  }
};

export { resourcesReducer };
