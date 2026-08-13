import { useState, useEffect } from "react";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function getPokemon() {
    setLoading(true);
    try {
      let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!data.ok) {
        setError("Error occured");
        return;
      }
      let res = await data.json();
      setPokemon(res);
      setError("");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPokemon();
  }, [])

  return (
    <>
      <div>
        <h1>Pokemon Search</h1>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter Here" />
        <button onClick={getPokemon}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!error && pokemon.name && <p>{`Pokemon's name is ${pokemon.name}`}</p>}
        {!error && pokemon.sprites && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
        {!error && pokemon.abilities && (
          <ul>
            {pokemon.abilities.map((e)=> {
              return <li key={e.ability.name}>{e.ability.name}</li>
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
