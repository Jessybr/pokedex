import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PokedexScreen } from '../screens/PokedexScreen';
import { Pokemon } from '../types/Pokemon';
import { PokemonDetailScreen } from '../screens/PokemonDetailScreen';

export type RootStackParamList = {
  Pokedex: undefined;
  PokemonDetail: { pokemon: Pokemon };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={PokedexScreen} />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={({ route }) => ({ title: route.params.pokemon.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
