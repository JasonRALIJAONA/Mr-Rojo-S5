import { View, Text, StyleSheet } from "react-native"

export default function Transactions() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transactions Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E2126",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
  },
})

