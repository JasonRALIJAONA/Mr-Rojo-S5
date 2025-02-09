import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

export default function BalanceCard() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError("Utilisateur non connecté");
      setLoading(false);
      return;
    }

    const q = query(collection(db, "mvt_fond"), where("id_utilisateur", "==", user.uid));

    // Écoute les changements en temps réel
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalDepot = 0;
      let totalRetrait = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        totalDepot += data.depot || 0;
        totalRetrait += data.retrait || 0;
      });

      setBalance(totalDepot - totalRetrait);
      setLoading(false);
    }, (error) => {
      console.error("Erreur lors du calcul du solde:", error);
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe(); // Nettoyage de l'écouteur
  }, []);

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
      <Text style={styles.balance}>{balance.toFixed(2)}</Text>
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
});
