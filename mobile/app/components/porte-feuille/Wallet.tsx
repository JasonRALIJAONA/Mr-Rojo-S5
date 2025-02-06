import { StyleSheet, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import BalanceCard from "./BalanceCard"
import ActionButtons from "./ActionButtons"
import Transaction from "./Transaction"
// import Transactions from "./Transactions"

export default function Wallet() {
  return (
    <LinearGradient colors={["#001F3F", "#003366"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BalanceCard />
        <ActionButtons />
        <Transaction />
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
})

