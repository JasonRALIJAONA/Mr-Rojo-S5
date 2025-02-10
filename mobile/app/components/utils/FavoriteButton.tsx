import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FavoriteButtonProps {
  initialState?: boolean;
  onPress?: (isFavorite: boolean) => void;
  size?: number;
}

export default function FavoriteButton({ initialState = false, onPress, size = 24 }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialState);

  useEffect(() => {
    setIsFavorite(initialState); // Met à jour l'état si initialState change
  }, [initialState]);

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (onPress) {
      onPress(newState);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
      <Ionicons
        name={isFavorite ? "star" : "star-outline"}
        size={size}
        color={isFavorite ? "#FFD700" : "#A9A9A9"} // Gold if favorite, gray otherwise
        style={styles.star}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
