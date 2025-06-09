import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { capitalize } from '../utils/format';
import { getPokemonSpecies } from '../services/api';

type Props = {
  route: RouteProp<RootStackParamList, 'PokemonDetail'>;
};

export const PokemonDetailScreen = ({ route }: Props) => {
  const { pokemon } = route.params;
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecies = async () => {
      const result = await getPokemonSpecies(pokemon.id);
      setDescription(result);
    };
    fetchSpecies();
  }, [pokemon.id]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      <Text style={styles.label}>Tipos: {pokemon.types.join(', ')}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : (
        <ActivityIndicator size="small" color="#666" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  image: { width: 150, height: 150, marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  label: { fontSize: 18, marginBottom: 16 },
  description: { fontSize: 16, fontStyle: 'italic', textAlign: 'center' },
});
