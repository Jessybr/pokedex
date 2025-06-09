import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { getPokemonDetails, getPokemons } from '../services/api';
import { RootStackParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export const PokedexScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets(); // Hook para área segura
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const LIMIT = 30;
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const list = await getPokemons(LIMIT, offset);
      const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
      setPokemons(details);
    } catch (err: any) {
      setError('Falha ao carregar Pokémons. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePokemons = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const newOffset = offset + LIMIT;

    try {
      const list = await getPokemons(LIMIT, newOffset);
      const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
      setPokemons(prev => [...prev, ...details]);
      setOffset(newOffset);
    } catch (err) {
      setError('Erro ao carregar mais Pokémons.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const filtered = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        placeholder="Buscar pokémon..."
        style={styles.input}
        onChangeText={setSearch}
        value={search}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#FF0000" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
                <PokemonCard
                    pokemon={item}
                    onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
                />
          )}
          onEndReached={loadMorePokemons}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator size="small" color="#555" style={{ margin: 16 }} />
            ) : null
          }
          ListEmptyComponent={() => {
            if (search) {
              return (
                <Text style={styles.empty}>
                  Nenhum Pokémon encontrado para '{search}'
                </Text>
              );
            }
            if (!isLoading && pokemons.length === 0) {
              return (
                <Text style={styles.empty}>
                  Nenhum Pokémon para exibir no momento.
                </Text>
              );
            }
            return null;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
  },
});
