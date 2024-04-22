import Badge from "./TypeBadge";
import { Link } from "@remix-run/react";

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types }) => {
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

  return (
    <div className="shadow-xl transition-all flex w-3/4 h-32 mt-10 rounded-2xl items-center">
      <div className="h-full w-1/4 flex rounded-2xl justify-center">
        <img
          className="rounded-2xl w-full"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${id}.png`}
          alt="POKEMON IMAGE"
        />
      </div>
      <div className="ml-10 flex w-2/4 flex-col justify-center items-start items-stretch">
        <div className="">
          <span className="font-bold">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </span>
        </div>
        <div className="flex flex-row mt-10 items-center">
          {types.map((type, index) => (
            <Badge key={index} color={colors[type]} content={type} />
          ))}
          <div></div>
        </div>
      </div>
      <div>
        <button className="btn">
          <Link to={`/pokemon/${id}`}>View</Link>
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
