import React, { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import MoveCard from "./MoveCard";
import StatBar from "./StatBar";
import TypeBadge from "./TypeBadge";

interface PokemonProps {
  name: string;
  exp: number;
  height: number;
  weight: number;
  id: number;
  types: string[];
  moves: string[];
  stats: string[];
}

const Pokemon: React.FC<PokemonProps> = ({
  name,
  exp,
  height,
  weight,
  id,
  types,
  moves,
  stats,
}) => {
  const colors: { [key: string]: string } = {
    normal: "#a8a878",
    fire: "#f08030",
    water: "#6890f0",
    electric: "#f8d030",
    grass: "#78c850",
    ice: "#98d8d8",
    fighting: "#c03028",
    poison: "#a040a0",
    ground: "#e0c068",
    flying: "#a890f0",
    psychic: "#f85888",
    bug: "#a8b820",
    rock: "#b8a038",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#b8b8d0",
    fairy: "#f0b6bc",
  };

  moves = moves.slice(0, 10);

  const [isInCollection, setIsInCollection] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("stats");

  useEffect(() => {
    const existingCollection =
      JSON.parse(localStorage.getItem("pokemonCollection") || "[]") || [];
    const isInCollection = existingCollection.some((p: any) => p.id === id);
    setIsInCollection(isInCollection);
  }, [id]);

  const handleAddToCollection = () => {
    const pokemon = {
      name,
      exp,
      height,
      weight,
      id,
      types,
    };

    const existingCollection =
      JSON.parse(localStorage.getItem("pokemonCollection") || "[]") || [];

    existingCollection.push(pokemon);

    localStorage.setItem(
      "pokemonCollection",
      JSON.stringify(existingCollection)
    );

    setIsInCollection(true);
  };

  return (
    <div>
      <div className="flex w-full justify-center p-10">
        <div className="flex w-3/4 center">
          <img
            className="rounded-lg mx-auto"
            width={500}
            height={500}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${id}.png`}
            alt={`IMAGE OF ${name.toUpperCase()}`}
          />
        </div>
        <div className="flex flex-col w-2/4 text-left">
          <div className="flex flex-row justify-between">
            <h1 className="text-6xl font-bold">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h1>
            <div>
              <Link to="/">
                <button className="btn btn-circle btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <h2 className="text-2xl">Base Experience: {exp}</h2>
            <h2 className="text-2xl">Height: {height}</h2>
            <h2 className="text-2xl">Weight: {weight}</h2>
            <div className="flex flex-row mt-10">
              {types.map((type) => (
                <TypeBadge key={type} color={colors[type]} content={type} />
              ))}
            </div>
          </div>
          <div className="flex h-full">
            <div className="flex justify-end">
              <button
                className="btn self-end"
                onClick={handleAddToCollection}
                disabled={isInCollection}
              >
                {isInCollection ? "Already in collection" : "Add to collection"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full justify-center p-10">
        <div>
          <button
            className={`btn mr-3 ${
              activeTab === "stats" ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </button>
          <button
            className={`btn ${
              activeTab === "moves" ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setActiveTab("moves")}
          >
            Moves
          </button>
        </div>
        <div className="w-full">
          {activeTab === "stats" && (
            <div className="flex flex-col mt-10 items-center justify-center">
              {stats.map((stat, index) => (
                <StatBar key={index} content={stat} />
              ))}
            </div>
          )}
          {activeTab === "moves" && (
            <div className="flex flex-row mt-10 items-center justify-center">
              {moves.map((move, index) => (
                <MoveCard key={index} content={move} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
