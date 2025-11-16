import { GET_ALL_POKEMONS } from "../actions/index";
import { GET_POKEMON_DETAILS_SUCCESS } from "../actions/index";

const initialState = {
  pokemon: [],
  loading: false,
  error: null,
  count: 0,
  limit: 20,
  offset: 0,
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          pokemon: action.payload,
          loading: false,
          error: null,
        };
      }
      return {
        ...state,
        pokemon: action.payload?.items || [],
        count:
          typeof action.payload?.count === "number"
            ? action.payload.count
            : state.count,
        limit:
          typeof action.payload?.limit === "number"
            ? action.payload.limit
            : state.limit,
        offset:
          typeof action.payload?.offset === "number"
            ? action.payload.offset
            : state.offset,
        loading: false,
        error: null,
      };
    case GET_POKEMON_DETAILS_SUCCESS:
      return {
        ...state,
        pokemon: state.pokemon.map((p) =>
          p.id === action.payload.id
            ? {
                ...p,
                types: action.payload.types,
                stats: action.payload.stats,
              }
            : p
        ),
      };
    default:
      return state;
  }
};

export { pokemonReducer };
