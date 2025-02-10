import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../type/type";
import { auth, db } from "../../../firebaseConfig";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";

type Props = StackScreenProps<RootStackParamList, "Login"> & {
  onLogin: () => void;
};

export default function LoginForm({ navigation, onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoginFormValid = email && password;

  // Fonction pour générer le token de notification push
  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Permission refusée", "Les notifications push ne fonctionneront pas sans permission.");
        return;
      }

      const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        Alert.alert("Erreur", "Project ID non trouvé dans app.json");
        return;
      }

      try {
        const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        console.log("Token Expo généré :", pushTokenString);
        return pushTokenString;
      } catch (e) {
        Alert.alert("Erreur", `Impossible de générer le token : ${e}`);
        return;
      }
    } else {
      Alert.alert("Erreur", "Utilisez un appareil physique pour les notifications push.");
      return;
    }
  }

  const handleSubmit = async () => {
    if (!isLoginFormValid) return;
    setLoading(true);
  
    try {
      // Authentification Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Connexion réussie :", userCredential.user);
  
      // Récupérer les données de l'utilisateur depuis Firestore
      const usersCollectionRef = collection(db, "Utilisateur");
      const q = query(usersCollectionRef, where("email", "==", userCredential.user.email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Supposons qu'il n'y a qu'un seul document par email
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log("Donnees utilisateur :", userData);
  
        // Enregistrer le token Expo
        const pushToken = await registerForPushNotificationsAsync();
        if (pushToken) {
          const pushTokenCollectionRef = collection(db, "UtilisateurPushToken");
  
          // Vérifier si un document existe déjà pour cet utilisateur
          const tokenQuery = query(pushTokenCollectionRef, where("utilisateur.id", "==", userDoc.id));
          
          const tokenQuerySnapshot = await getDocs(tokenQuery);
  
          console.log("Nombre de documents trouvés :", tokenQuerySnapshot.size);
  
          if (!tokenQuerySnapshot.empty) {
            // S'il existe un document, mettre à jour le token
            const existingTokenDoc = tokenQuerySnapshot.docs[0];
            await updateDoc(existingTokenDoc.ref, { expoToken: pushToken });
            console.log("Token mis à jour dans Firestore.");
          } else {
            // Sinon, créer un nouveau document
            await addDoc(pushTokenCollectionRef, {
              expoToken: pushToken,
              utilisateur: {
                id: userDoc.id,
                ...userData, // Ajouter les données utilisateur si nécessaire
              },
            });
            console.log("Token ajouté à Firestore.");
          }
        }
  
        Alert.alert("Connexion réussie", `Bienvenue ${userData.nomUtilisateur} !`);
        onLogin(); // Appeler la fonction de connexion réussie
      } else {
        console.log("Document utilisateur introuvable");
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
});