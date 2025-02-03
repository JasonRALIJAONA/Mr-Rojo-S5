import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FavoriteButton from '../utils/FavoriteButton'
interface CryptoCardProps {
  nom: string;
  symbole: string;
  prix: string;
  username: string;
  buttonText: string;
}

export default function CryptoCard({
  nom,
  symbole,
  prix,
  username,
  buttonText,
}: CryptoCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardNom}>{nom}</Text>
      <Text style={styles.cardSymbole}>{symbole}</Text>
      <Text style={styles.cardPrix}>{prix}</Text>
      <Text style={styles.cardUsername}>{username}</Text>
      <FavoriteButton></FavoriteButton>
      {/* <TouchableOpacity style={styles.cardButton}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardNom: {
    fontSize: 18,
    color: '#0F2573',
    marginBottom: 8,
    fontWeight: '600',
  },
  cardSymbole: {
    fontSize: 16,
    color: '#0F2573',
    marginBottom: 8,
  },
  cardPrix: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F2573',
    marginBottom: 8,
  },
  cardUsername: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: '#0F2573',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
