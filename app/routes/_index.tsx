import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
}

export const meta = () => {
  return [
    { title: "Pokedex" },
    { name: "A pokedex app", content: "Welcome to Pokedex!" },
  ];
};

const Index: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedPokemon = JSON.parse(localStorage.getItem("pokemonCollection") || "[]") as Pokemon[];
    if (storedPokemon) {
      setPokemonData(storedPokemon);
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-1/2 items-center justify-center">
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon, index) => (
            <PokemonCard
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
            />
          ))
        ) : (
          <h1 className="text-4xl text-gray-600">
            You haven't added any Pokemons yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default Index;
