import React, { useState } from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  getAllPokemons,
  getPokemonDetails,
} from "../../redux/actions/pokemons";

const Pokemon = () => {
  const [expanded, setExpanded] = useState({});
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemonReducer.pokemon);
  const [page, setPage] = useState(0);
  const limit = 20;
  const [query, setQuery] = useState("");

  const handleInitialLoad = () => {
    setPage(0);
    dispatch(getAllPokemons(limit, 0));
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const nextOffset = nextPage * limit;
    dispatch(getAllPokemons(limit, nextOffset));
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPokemons =
    Array.isArray(pokemons) && normalizedQuery
      ? pokemons.filter((p) => p.name?.toLowerCase().includes(normalizedQuery))
      : pokemons;

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Pokémon</h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "10px 12px",
              outline: "none",
              minWidth: 220,
            }}
          />
          <button
            onClick={handleInitialLoad}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Load Pokémon
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {Array.isArray(filteredPokemons) &&
          filteredPokemons.map((p) => (
            <div
              key={p.id}
              style={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.10)",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(25,118,210,0.1), rgba(25,118,210,0.02))",
                  padding: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 160,
                }}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ height: 140, width: 140, objectFit: "contain" }}
                  />
                ) : (
                  <div
                    style={{
                      height: 140,
                      width: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9ca3af",
                      fontSize: 14,
                    }}
                  >
                    No Image
                  </div>
                )}
              </div>
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      textTransform: "capitalize",
                      fontSize: 18,
                      color: "#000",
                    }}
                  >
                    {p.name}
                  </h3>
                  <span
                    style={{
                      fontSize: 12,
                      background: "#f3f4f6",
                      color: "#6b7280",
                      borderRadius: 6,
                      padding: "4px 8px",
                    }}
                  >
                    #{p.id}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const next = { ...expanded, [p.id]: !expanded[p.id] };
                    setExpanded(next);
                    if (!p.stats && !p.types && !expanded[p.id]) {
                      dispatch(getPokemonDetails(p.id, p.url));
                    }
                  }}
                  style={{
                    background: "#111827",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 8,
                    cursor: "pointer",
                    marginBottom: 12,
                  }}
                >
                  {expanded[p.id] ? "Hide Details" : "Show Details"}
                </button>

                {expanded[p.id] && (
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    {(p.types || []).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 12,
                          background: "#e0f2fe",
                          color: "#0369a1",
                          borderRadius: 9999,
                          padding: "4px 10px",
                          textTransform: "capitalize",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {expanded[p.id] && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 8,
                    }}
                  >
                    {(p.stats || []).slice(0, 4).map((s) => (
                      <div
                        key={s.name}
                        style={{
                          background: "#f9fafb",
                          borderRadius: 8,
                          padding: "8px 10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          {s.name}
                        </span>
                        <span style={{ fontWeight: 600, color: "#111827" }}>
                          {s.value}
                        </span>
                      </div>
                    ))}
                    {(!p.stats || p.stats.length === 0) && (
                      <div
                        style={{
                          background: "#f9fafb",
                          borderRadius: 8,
                          padding: "8px 10px",
                          textAlign: "center",
                          color: "#6b7280",
                        }}
                      >
                        Loading details...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      {Array.isArray(filteredPokemons) &&
        filteredPokemons.length === 0 &&
        normalizedQuery && (
          <div style={{ textAlign: "center", color: "#6b7280", marginTop: 16 }}>
            No Pokémon found for “{query}”.
          </div>
        )}
      {Array.isArray(pokemons) && pokemons.length > 0 && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
        >
          <button
            onClick={handleLoadMore}
            style={{
              background: "#111827",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
