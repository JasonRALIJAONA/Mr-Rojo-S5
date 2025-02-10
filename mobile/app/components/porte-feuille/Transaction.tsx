import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Transaction {
  id: string;
  type: "achat" | "vente"; 
  amount: string;
  currency: string;
  date: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userCredential = auth.currentUser;
        if (!userCredential) {
          Alert.alert("Erreur", "Aucun utilisateur n'est connecté.");
          return;
        }

        const userQuery = query(collection(db, "Utilisateur"), where("email", "==", userCredential.email));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          Alert.alert("Erreur", "Utilisateur introuvable.");
          return;
        }

        const userId = userSnapshot.docs[0].id;
        const transactionsQuery = query(collection(db, "Transaction"), where("utilisateur.id", "==", userId));
        const transactionsSnapshot = await getDocs(transactionsQuery);

        const transactionData = transactionsSnapshot.docs.map((doc) => {
          const data = doc.data();
          const amount = (data.quantite * data.prixUnitaire).toFixed(2); // Calculating the amount
          return {
            id: doc.id,
            type: data.achat > 0 ? "achat" : "vente", // Matching the transaction type with "achat" or "vente"
            amount,
            currency: data.vente, // Assuming "vente" is the currency, adjust if necessary
            date: new Date(data.dateTransaction.seconds * 1000).toISOString().split("T")[0], // Formatting the date
          };
        });

        setTransactions(transactionData);
      } catch (error) {
        console.error("Erreur de récupération des transactions :", error);
        Alert.alert("Erreur", "Impossible de récupérer les transactions.");
      }
    };

    fetchTransactions();
  }, []);

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        <AntDesign
          name={item.type === "achat" ? "arrowup" : "arrowdown"} // Adjusted to match transaction type
          size={24}
          color={item.type === "achat" ? "#FF6B6B" : "#4CAF50"}
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>
          {item.type === "achat" ? "Achat" : "Vente"} {item.currency}
        </Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={[styles.transactionAmount, { color: item.type === "achat" ? "#FF6B6B" : "#4CAF50" }]}>
        {item.amount} {item.currency}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ventes/Achats</Text>
      <FlatList data={transactions} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
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
});
