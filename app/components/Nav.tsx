import { Link } from "@remix-run/react";
import { useState } from "react";
import { GraphQLClient } from "graphql-request";
interface Pokemon {
  id: number;
  name: string;
}

const PokeAPIquery = `
  query PokeAPIquery($searchQuery: String!) {
    pokemon_v2_pokemon(where: {name: {_like: $searchQuery}}) {
      id
      name
    }
  }
`;

const client = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta");

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const debouncedUpdate = debounce(async () => {
    try {
      const data = await client.request<{ pokemon_v2_pokemon: Pokemon[] }>(
        PokeAPIquery,
        {
          searchQuery: searchQuery + "%",
        }
      );
      setPokemonData(data.pokemon_v2_pokemon);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
    }
  }, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      setPokemonData([]);
      setShowDropdown(false);
    } else {
      debouncedUpdate();
    }
  };

  const empty = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setPokemonData([]);
    setShowDropdown(false);
  };

  return (
    <div className="mt-5 flex w-full text-2xl justify-around items-center relative">
      <Link to="/" prefetch="intent" className="text-2xl font-semibold">
        <span className="text-amber-400">Poke</span>
        <span className="text-red-500">dex</span>
      </Link>
      <div className="relative w-96">
        <input
          type="search"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />

        {showDropdown && (
          <ul className="bg-white absolute border border-gray-200 rounded-md mt-1 max-w-xs max-h-48 overflow-y-auto">
            {pokemonData.map((pokemon) => (
              <Link
                key={pokemon.id}
                to={`/pokemon/${pokemon.id}`}
                onClick={empty}
              >
                <li className="text-2xl font-semibold py-2 px-4 hover:bg-gray-100">
                  {pokemon.name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <label className="swap swap-rotate">
        <input type="checkbox" className="theme-controller" value="cupcake" />
        <svg
          className="swap-off fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        <svg
          className="swap-on fill-current w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </div>
  );
};

export default Nav;
