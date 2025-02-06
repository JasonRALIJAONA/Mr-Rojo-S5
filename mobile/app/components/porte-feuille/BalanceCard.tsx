import { View, Text, StyleSheet } from "react-native"

export default function BalanceCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total</Text>
      <Text style={styles.balance}>$10,234.56</Text>
      <Text style={styles.change}>+5.23% (24h)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    color: "#B0C4DE",
    fontSize: 16,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  change: {
    color: "#4CAF50",
    fontSize: 14,
  },
})

