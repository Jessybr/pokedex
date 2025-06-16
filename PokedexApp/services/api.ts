import axios from 'axios';
import { Pokemon, PokemonListItem } from '../types/Pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';

export async function getPokemons(limit: number, offset = 0): Promise<PokemonListItem[]> {
  try {
    const res = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
    return res.data.results;
  } catch (error) {
    console.error('Erro ao buscar a lista de Pokémons:', error);
    throw new Error('Não foi possível carregar a lista de Pokémons.');
  }
}

export async function getPokemonSpecies(id: number): Promise<string> {
  try {
    const res = await axios.get(`${API_BASE}/pokemon-species/${id}`);
    const entry = res.data.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    );
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Descrição não encontrada.';
  } catch (err) {
    return 'Erro ao buscar descrição.';
  }
}

export async function getPokemonDetails(url: string): Promise<Pokemon> {
  try {
    const res = await axios.get(url);
    return {
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.front_default,
      types: res.data.types.map((t: any) => t.type.name),
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do Pokémon:', error);
    throw new Error('Não foi possível carregar os detalhes do Pokémon.');
  }
}
