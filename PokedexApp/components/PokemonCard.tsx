import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Pokemon } from '../types/Pokemon';
import { capitalize } from '../utils/format';

type Props = {
  pokemon: Pokemon;
  onPress?: () => void;
};

export const PokemonCard = ({ pokemon, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    margin: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
  },
  image: { width: 80, height: 80, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: 'bold' },
});
