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
  const totalCount = useSelector((state) => state.pokemonReducer.count);
  const [page, setPage] = useState(0);
  const limit = 20;
  const [query, setQuery] = useState("");

  const handleInitialLoad = () => {
    setPage(0);
    dispatch(getAllPokemons(limit, 0));
  };

  const totalPages =
    typeof totalCount === "number" && totalCount > 0
      ? Math.ceil(totalCount / limit)
      : 0;

  const goToPage = (nextPage) => {
    if (totalPages === 0) return;
    const bounded =
      nextPage < 0 ? 0 : nextPage > totalPages - 1 ? totalPages - 1 : nextPage;
    setPage(bounded);
    const nextOffset = bounded * limit;
    setExpanded({});
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
      {totalPages > 1 && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => goToPage(0)}
              disabled={page === 0}
              style={{
                background: page === 0 ? "#e5e7eb" : "#111827",
                color: page === 0 ? "#6b7280" : "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: page === 0 ? "not-allowed" : "pointer",
              }}
            >
              First
            </button>
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 0}
              style={{
                background: page === 0 ? "#e5e7eb" : "#111827",
                color: page === 0 ? "#6b7280" : "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: page === 0 ? "not-allowed" : "pointer",
              }}
            >
              Prev
            </button>
            {(() => {
              const maxButtons = 5;
              let start = Math.max(0, page - Math.floor(maxButtons / 2));
              let end = Math.min(totalPages - 1, start + maxButtons - 1);
              if (end - start + 1 < maxButtons) {
                start = Math.max(0, end - maxButtons + 1);
              }
              const pages = [];
              for (let i = start; i <= end; i += 1) {
                pages.push(i);
              }
              return pages;
            })().map((pNum) => (
              <button
                key={pNum}
                onClick={() => goToPage(pNum)}
                style={{
                  background: pNum === page ? "#1976d2" : "#f3f4f6",
                  color: pNum === page ? "#fff" : "#111827",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  minWidth: 40,
                  fontWeight: pNum === page ? 700 : 500,
                }}
              >
                {pNum + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages - 1}
              style={{
                background: page >= totalPages - 1 ? "#e5e7eb" : "#111827",
                color: page >= totalPages - 1 ? "#6b7280" : "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: page >= totalPages - 1 ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
            <button
              onClick={() => goToPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
              style={{
                background: page >= totalPages - 1 ? "#e5e7eb" : "#111827",
                color: page >= totalPages - 1 ? "#6b7280" : "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: page >= totalPages - 1 ? "not-allowed" : "pointer",
              }}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
