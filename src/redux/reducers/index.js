import { combineReducers } from "redux";
import { resourcesReducer } from "./resources-reducer";
import { counterReducer } from "./counter-reducer";
import { pokemonReducer } from "./porkemon-reducer";

const reducer = combineReducers({
  resourcesReducer,
  counterReducer,
  pokemonReducer,
});

export default reducer;
