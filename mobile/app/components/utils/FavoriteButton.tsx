import { useState } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface FavoriteButtonProps {
  initialState?: boolean
  onPress?: (isFavorite: boolean) => void
  size?: number
}

export default function FavoriteButton({ initialState = false, onPress, size = 24 }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialState)

  const toggleFavorite = () => {
    const newState = !isFavorite
    setIsFavorite(newState)
    if (onPress) {
      onPress(newState)
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
      <Ionicons
        name="star"
        size={size}
        color={isFavorite ? styles.starFilled.color : styles.starOutline.color}
        style={styles.star}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  starFilled: {
    color: "#FFD700", // Gold color for the filled star
  },
  starOutline: {
    color: "#A9A9A9", // Dark gray color for the unfilled star
  },
})

