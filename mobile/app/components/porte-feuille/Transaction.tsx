import { View, Text, StyleSheet, FlatList } from "react-native"
import { AntDesign } from "@expo/vector-icons"

interface Transaction {
  id: string
  type: "send" | "receive"
  amount: string
  currency: string
  date: string
}

const transactions: Transaction[] = [
  { id: "1", type: "send", amount: "-0.25", currency: "BTC", date: "2023-05-01" },
  { id: "2", type: "receive", amount: "+1.5", currency: "ETH", date: "2023-04-30" },
  { id: "3", type: "send", amount: "-100", currency: "USDT", date: "2023-04-29" },
  { id: "4", type: "receive", amount: "+0.1", currency: "BTC", date: "2023-04-28" },
]

export default function Transaction() {
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        <AntDesign
          name={item.type === "send" ? "arrowup" : "arrowdown"}
          size={24}
          color={item.type === "send" ? "#FF6B6B" : "#4CAF50"}
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>
          {item.type === "send" ? "Sent" : "Received"} {item.currency}
        </Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={[styles.transactionAmount, { color: item.type === "send" ? "#FF6B6B" : "#4CAF50" }]}>
        {item.amount} {item.currency}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList data={transactions} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  transactionDate: {
    color: "#B0C4DE",
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

