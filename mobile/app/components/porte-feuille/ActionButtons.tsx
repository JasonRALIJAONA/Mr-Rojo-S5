import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"

export default function ActionButtons() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="arrowup" size={36} color="#FFFFFF" />
        <Text style={styles.buttonText}>Recuperer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="arrowdown" size={36} color="#FFFFFF" />
        <Text style={styles.buttonText}>Deposer</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    marginTop: 5,
  },
})

