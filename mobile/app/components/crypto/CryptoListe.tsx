"use client"

import { useEffect, useState } from "react"
import { View, FlatList, SafeAreaView, StyleSheet, Text } from "react-native"
import CryptoCard from "./CryptoCard"
import { db } from "../../../firebaseConfig"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"

export default function CryptoListe() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const coursCryptoRef = collection(db, "CoursCrypto")
    const q = query(coursCryptoRef, orderBy("dateCours", "desc"))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const coursData = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            montant: data.montant,
            cryptoNom: data.cryptomonnaie?.nom || "Inconnu",
            cryptoSymbole: data.cryptomonnaie?.symbole || "N/A",
          }
        })

        console.log("Données mises à jour en temps réel :", coursData)
        setCards(coursData)
      },
      (error) => {
        console.error("Erreur lors de l'écoute des changements :", error)
      },
    )

    return () => unsubscribe()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CryptoCard symbole={item.cryptoSymbole} nom={item.cryptoNom} idCryptomonnaie={item.id} prix={item.montant} />
        )}
        numColumns={2}
        contentContainerStyle={styles.cardsContainer}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1929",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#0F2573",
    borderBottomWidth: 1,
    borderBottomColor: "#1E3A5F",
  },
  header: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardsContainer: {
    padding: 8,
  },
})

