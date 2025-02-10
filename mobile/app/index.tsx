import React from 'react';
import 'react-native-polyfill-globals/auto';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import CryptoCard from './components/crypto/CryptoCard'; // Assure-toi que le chemin est correct
import CryptoListe  from './components/crypto/CryptoListe';
import MainNavigation from './components/statics/MainNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from './components/login/LoginForm';
import AppNavigation from './components/statics/AppNavigation';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Définir les données des cartes
const cards = [
  { id: '1', nom: 'Bitcoin', prix: '$45,000', username: 'satoshi_nakamoto' },
  { id: '2', nom: 'Ethereum', prix: '$3,200', username: 'vitalik_buterin' },
  { id: '3', nom: 'Cardano', prix: '$1.50', username: 'charles_hoskinson' },
  { id: '4', nom: 'Dogecoin', prix: '$0.25', username: 'elon_musk' },
  { id: '5', nom: 'Polkadot', prix: '$28', username: 'gavin_wood' },
];

// const Stack = createStackNavigator();
const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: LoginForm,
    Main: MainNavigation,
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function App() {
  return (
    // <NavigationContainer>
      <MainNavigation />
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: '#0F2573',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardsContainer: {
    padding: 16,
  },
});
