"use client";

import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { getAuthenticatedUser } from "../../utils/UserAuth"; // Import de la fonction

interface AmountModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (amount: string) => void;
  actionType: "Recuperer" | "Deposer";
}

export default function AmountModal({ isVisible, onClose, onSubmit, actionType }: AmountModalProps) {
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState<any>(null); // Stocke les données complètes de l'utilisateur

  useEffect(() => {
    if (isVisible) {
      fetchUser();
    }
  }, [isVisible]);

  const fetchUser = async () => {
    const authenticatedUser = await getAuthenticatedUser();
    if (authenticatedUser) {
      setUser(authenticatedUser); // Stocke les données complètes de l'utilisateur
    } else {
      setUser(null);
      Alert.alert("Erreur", "Impossible de récupérer l'utilisateur.");
    }
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      console.error("Utilisateur non authentifié");
      Alert.alert("Erreur", "Vous devez être connecté pour effectuer cette action.");
      return;
    }

    if (!user) {
      console.error("Données utilisateur introuvables");
      Alert.alert("Erreur", "Impossible d'enregistrer l'opération.");
      return;
    }

    const montant = parseFloat(amount);
    if (isNaN(montant) || montant <= 0) {
      console.error("Montant invalide");
      Alert.alert("Erreur", "Veuillez entrer un montant valide.");
      return;
    }

    try {
      await addDoc(collection(db, "MvtFond"), {
        depot: actionType === "Deposer" ? montant : 0,
        retrait: actionType === "Recuperer" ? montant : 0,
        dateMvt: serverTimestamp(),
        utilisateur: user, // Insère l'objet utilisateur complet
      });

      console.log("Mouvement enregistré avec succès");
      Alert.alert("Succès", "Transaction enregistrée !");
    } catch (error) {
      console.error("Erreur lors de l'insertion dans Firestore :", error);
      Alert.alert("Erreur", "Échec de l'enregistrement.");
    }

    onSubmit(amount);
    setAmount("");
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{actionType} - Enter Amount</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAmount}
            value={amount}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onClose}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={handleSubmit}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: "#FF6347",
  },
  buttonSubmit: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

