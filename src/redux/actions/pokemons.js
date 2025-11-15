import axios from "axios";
import { GET_ALL_POKEMONS, GET_POKEMON_DETAILS_SUCCESS } from "./index";

const getAllPokemons =
  (limit = 20, offset = 0) =>
  async (dispatch) => {
    try {
      // Fetch a list of pokemon (first 20)
      const listResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const results = listResponse.data?.results || [];

      // Build minimal items only: id, name, image (derived), url
      const items = results.map((p) => {
        const match = p.url.match(/\/pokemon\/(\d+)\/?$/);
        const id = match ? Number(match[1]) : null;
        const image = id
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          : undefined;
        return { id, name: p.name, image, url: p.url };
      });

      dispatch({
        type: GET_ALL_POKEMONS,
        payload: {
          items,
          offset,
          limit,
          hasMore: !!listResponse.data?.next,
        },
      });
    } catch (error) {
      // dispatch({ type: GET_ALL_POKEMONS_FAILURE, payload: error.message });
      console.log(error);
    }
  };

// Fetch details for a single pokemon lazily (types, stats)
const getPokemonDetails = (id, url) => async (dispatch) => {
  try {
    const detail = await axios.get(
      url || `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const data = detail.data;
    const details = {
      id: data.id,
      types: (data.types || []).map((t) => t.type?.name),
      stats: (data.stats || []).map((s) => ({
        name: s.stat?.name,
        value: s.base_stat,
      })),
    };
    dispatch({ type: GET_POKEMON_DETAILS_SUCCESS, payload: details });
  } catch (error) {
    console.log(error);
  }
};

export { getAllPokemons, getPokemonDetails };
