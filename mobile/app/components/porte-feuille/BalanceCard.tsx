import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
export default function BalanceCard() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        // const user = auth.currentUser;
        // if (!user) {
        //   throw new Error("Utilisateur non connecté");
        // }

        // const q = query(collection(db, 'mvt_fond'), where('id_utilisateur', '==', user.uid));
        const q = query(collection(db, 'mvt_fond'), where('id_utilisateur', '==', 1));

        const snapshot = await getDocs(q);

        let totalDepot = 0;
        let totalRetrait = 0;

        snapshot.forEach(doc => {
          const data = doc.data();
          totalDepot += data.depot || 0;
          totalRetrait += data.retrait || 0;
        });

        setBalance(totalDepot - totalRetrait);
      } catch (error) {
        console.error("Erreur lors du calcul du solde:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBalance();
  }, [db, auth]);

  if (loading) {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>Erreur: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total</Text>
      <Text style={styles.balance}>{balance?.toFixed(2) || "0.00"}</Text>
      {/* <Text style={styles.change}>+5.23% (24h)</Text> */}
    </View>
  );
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
});