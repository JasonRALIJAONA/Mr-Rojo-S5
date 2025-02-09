"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
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

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getAuthenticatedUser()
      if (user) {
        setIdUtilisateur(user.id)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (idUtilisateur) {
      checkIfFavorite(idUtilisateur)
    }
  }, [idUtilisateur])

  useEffect(() => {
    // Set up real-time listener for price updates
    const coursCryptoRef = collection(db, "CoursCrypto")
    const q = query(
      coursCryptoRef,
      where("idCryptomonnaie", "==", idCryptomonnaie),
      where("dateCours", "==", new Date().toISOString().split('T')[0]) // Get today's date
    )
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          const newPrice = change.doc.data().montant
          setCurrentPrix(newPrice.toString())
        }
      })
    }, (error) => {
      console.error("Error listening to price updates:", error)
    })

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => unsubscribe()
  }, [db, idCryptomonnaie])

  const checkIfFavorite = async (userId: string) => {
    try {
      console.log("idCryptomonnaie"+idCryptomonnaie);
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
  }

  const handleFavorite = async (newState: boolean) => {
    if (!idUtilisateur) return

    try {
      const favoritesRef = collection(db, "favori")
      const q = query(
        favoritesRef,
        where("idCryptomonnaie", "==", idCryptomonnaie),
        where("idUtilisateur", "==", idUtilisateur),
      )

      const snapshot = await getDocs(q)

      if (newState) {
        if (snapshot.empty) {
          await addDoc(favoritesRef, {
            id_cryptomonnaie: idCryptomonnaie,
            id_utilisateur: idUtilisateur,
            date_ajout: new Date(),
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
      // Revert the favorite state if an error occurs
      setIsFavorite(!newState)
    }
  }

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardNom}>{nom}</Text>
      <Text style={styles.cardSymbole}>{symbole}</Text>
      <Text style={styles.cardPrix}>{currentPrix}</Text>
      <FavoriteButton
        initialState={isFavorite}
        onPress={async (newState) => await handleFavorite(newState)}
        size={28}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardNom: {
    fontSize: 18,
    color: '#0F2573',
    marginBottom: 8,
    fontWeight: '600',
  },
  cardSymbole: {
    fontSize: 16,
    color: '#0F2573',
    marginBottom: 8,
  },
  cardPrix: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F2573',
    marginBottom: 8,
  },
})
