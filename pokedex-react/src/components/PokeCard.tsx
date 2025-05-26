import React, { useEffect, useState } from "react";
import "./pokeCard.css";

type Pokemon = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
};

type PokeCardProps = {
  pokemon: Pokemon;
};

export default function PokeCard({ pokemon }: PokeCardProps) {
  const [favorito, setFavorito] = useState(false);

  const alternarFavorito = () => {
    setFavorito((prev) => !prev);
  };

  useEffect(() => {
    console.log(`Pokémon ${pokemon.name} carregado com sucesso!`);
  }, [pokemon]);

  return (
    <div className="pokedex-card">
      <h3 className="pokedex-name">{pokemon.name}{favorito && <span> ⭐</span>}</h3>
      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokedex-image"
        />
      )}
      <p>
        <strong>Altura:</strong> {pokemon.height * 10} cm
      </p>
      <p>
        <strong>Peso:</strong> {pokemon.weight / 10} kg
      </p>
      <p>
        <strong>Tipos:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(" / ")}
      </p>

      <div className="pokedex-actions">
          <button className="pokedex-button-favorite" onClick={alternarFavorito}>
            {favorito ? "Desfavoritar" : "Favoritar"}
          </button>
      </div>
    </div>
  );
}
