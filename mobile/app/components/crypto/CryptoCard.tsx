"use client"

import { useState, useEffect, useCallback } from "react"
import { Text, StyleSheet, Animated } from "react-native"
import FavoriteButton from "../utils/FavoriteButton"
import { getFirestore, collection, query, where, getDocs, addDoc, deleteDoc, onSnapshot } from "firebase/firestore"
import { getAuthenticatedUser } from "../../utils/UserAuth"

interface CryptoCardProps {
  nom: string
  symbole: string
  prix: string
  idCryptomonnaie: string
}

export default function CryptoCard({ nom, symbole, prix: initialPrix, idCryptomonnaie }: CryptoCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [idUtilisateur, setIdUtilisateur] = useState<string | null>(null)
  const [currentPrix, setCurrentPrix] = useState(initialPrix)
  const db = getFirestore()
  const fadeAnim = useState(new Animated.Value(0))[0]

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getAuthenticatedUser()
      if (user) {
        setIdUtilisateur(user.id)
      }
    }

    fetchUser()
  }, [])

  const checkIfFavorite = useCallback(
    async (userId: string) => {
      try {
        const favoritesRef = collection(db, "favori")
        const q = query(
          favoritesRef,
          where("idCryptomonnaie", "==", idCryptomonnaie),
          where("idUtilisateur", "==", userId),
        )

        const snapshot = await getDocs(q)
        setIsFavorite(!snapshot.empty)
      } catch (error) {
        console.error("Error checking favorite status:", error)
      }
    },
    [db, idCryptomonnaie],
  )

  useEffect(() => {
    if (idUtilisateur) {
      checkIfFavorite(idUtilisateur)
    }
  }, [idUtilisateur, checkIfFavorite])

  useEffect(() => {
    const coursCryptoRef = collection(db, "CoursCrypto")
    const q = query(
      coursCryptoRef,
      where("idCryptomonnaie", "==", idCryptomonnaie),
      where("dateCours", "==", new Date().toISOString().split("T")[0]),
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" || change.type === "modified") {
            const newPrice = change.doc.data().montant
            setCurrentPrix(newPrice.toString())
          }
        })
      },
      (error) => {
        console.error("Error listening to price updates:", error)
      },
    )

    return () => unsubscribe()
  }, [db, idCryptomonnaie])

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const handleFavorite = async (newState: boolean) => {
    if (!idUtilisateur) return

    try {
      const favoritesRef = collection(db, "Favori")
      const q = query(
        favoritesRef,
        where("idCryptomonnaie", "==", idCryptomonnaie),
        where("idUtilisateur", "==", idUtilisateur),
      )

      const snapshot = await getDocs(q)

      if (newState) {
        if (snapshot.empty) {
          await addDoc(favoritesRef, {
            id: null,
            idCryptomonnaie: idCryptomonnaie,
            idUtilisateur: idUtilisateur,
            dateAjout: new Date(),
          })
          console.log("Added to favorites")
        }
      } else {
        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref)
          console.log("Removed from favorites")
        })
      }

      setIsFavorite(newState)
    } catch (error) {
      console.error("Error updating favorite status:", error)
      setIsFavorite(!newState)
    }
  }

  return (
    <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
      <Text style={styles.cardSymbole}>{symbole}</Text>
      <Text style={styles.cardNom}>{nom}</Text>
      <Text style={styles.cardPrix}>Ar{Number.parseFloat(currentPrix).toLocaleString()}</Text>
      <FavoriteButton
        initialState={isFavorite}
        onPress={async (newState) => await handleFavorite(newState)}
        size={24}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#1E3A5F",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardSymbole: {
    fontSize: 18,
    color: "#64B5F6",
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardNom: {
    fontSize: 14,
    color: "#B0BEC5",
    marginBottom: 8,
  },
  cardPrix: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 8,
  },
})

