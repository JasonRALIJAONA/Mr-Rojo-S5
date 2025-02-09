import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {  signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, collection, query, where, getDocs } from "firebase/firestore"; // Added missing imports
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../type/type";
import {auth, db} from "../../../firebaseConfig";

type Props = StackScreenProps<RootStackParamList, "Login"> & {
  onLogin: () => void;
};

export default function LoginForm({ navigation, onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoginFormValid = email && password;

  const handleSubmit = async () => {
    if (!isLoginFormValid) return;
    setLoading(true);

    try {
      // Authentification Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign-in successful:", userCredential.user);

      const usersCollectionRef = collection(db, "Utilisateur");
      const q = query(usersCollectionRef, where("email", "==", userCredential.user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming there's only one document per email
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log("User data:", userData);

          Alert.alert("Connexion réussie", `Bienvenue ${userData.nomUtilisateur} !`);
          onLogin(); // Mise à jour de l'état dans `MainNavigation`
      } else {
        console.log("User document does not exist");
        Alert.alert("Erreur", "Utilisateur introuvable.");
      }
    } catch (error: any) {
      console.error("Erreur de connexion :", error.code, error.message);
      Alert.alert("Erreur de connexion", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre email"
        placeholderTextColor="#64748b"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Entrez votre mot de passe"
        placeholderTextColor="#64748b"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, !isLoginFormValid && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!isLoginFormValid || loading}
      >
        <Text style={styles.buttonText}>{loading ? "Connexion..." : "Se connecter"}</Text>
      </TouchableOpacity>

      {/* <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#0a1a2f",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#1e3a8a",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#1e293b",
    color: "#ffffff",
  },
  button: {
    width: "100%",
    padding: 14,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#334155",
    shadowColor: "transparent",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  linkText: {
    color: "#60a5fa",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});