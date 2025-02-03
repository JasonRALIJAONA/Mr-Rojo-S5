import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FavoriteButtonProps {
  buttonText: string;
  // onPress: () => void;
}

export default function FavoriteButton({ buttonText, onPress }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => {
    setIsFavorite(!isFavorite);
    onPress();  // Appeler la fonction `onPress` passée en prop pour gérer l'action de clic
  };

  return (
    <TouchableOpacity
      style={[styles.button, isFavorite ? styles.favoritedButton : styles.defaultButton]}
      // onPress={handlePress}
    >
      <Text style={styles.buttonText}>
        {isFavorite ? 'Retirer des favoris' : buttonText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    backgroundColor: '#0F2573',
  },
  favoritedButton: {
    backgroundColor: '#ff6347', // Couleur pour l'état favori (rouge tomate)
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
