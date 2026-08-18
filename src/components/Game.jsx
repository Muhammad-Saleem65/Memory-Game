import { useEffect, useState } from "react";
import '../App.css'

function Game() {
  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [currentScore, setCurrentScore] = useState([]);
  const [BestScore, setBestScore] = useState(0);
  
  if (score > BestScore) {
    setBestScore(score) 
  }

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleClick = (pokemon) => {
    if (currentScore.includes(pokemon.id)){
      setCurrentScore([])
      setScore(0);
    }
    else {
      setCurrentScore([...currentScore, pokemon.id]);
      setScore(s => (s + 1))
    }

    setPokemons(shuffleArray(pokemons));
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      const requests = [];

      for (let id = 1; id <= 20; id++) {
        requests.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => response.json())
        );
      }

      const results = await Promise.all(requests);
      setPokemons(shuffleArray(results));
    };

    fetchPokemons();
  }, []);




  return (
    <>
    <header>
      <h1>Pokemon Memory Game</h1>
    </header>
    <div className="InfoContainer">
        <div className="CurrentScore">Current Score : {score}</div>
        <div className="BestScore">Best Score : {BestScore}</div>
    </div>
    <section>
        {pokemons.map((pokemon) => (
          <button key={pokemon.id} onClick={() => handleClick(pokemon)}>
            {pokemon.sprites.front_default && (
              <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
            )}
            <p>{pokemon.name}</p>
          </button>
        ))}
    </section>
    </>

  );
}

export default Game;