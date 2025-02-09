"use client";

import * as FileSystem from "expo-file-system";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { getAuthenticatedUser } from "@/app/utils/UserAuth";

// Définir les types
interface User {
  id: string;
  nomUtilisateur: string;
}

interface PhotoUtilisateur {
  dateChangement: Date;
  utilisateur: { id: string }; // Utilisateur est un objet de mappage
  lienPhoto: string;
}

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string>("https://placeholder.svg?height=100&width=100");
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);

  // Récupérer l'utilisateur authentifié
  const fetchAuthenticatedUser = async (): Promise<void> => {
    setLoading(true);
    try {
      const authenticatedUser = await getAuthenticatedUser();
      if (authenticatedUser) {
        setUser(authenticatedUser);
        fetchLastUploadedImage(authenticatedUser.id);
      } else {
        Alert.alert("Erreur", "Aucun utilisateur n'est connecté.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération de l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLastUploadedImage = async (userId: string): Promise<void> => {
    try {
      const q = query(
        collection(db, "PhotoUtilisateur"),
        where("utilisateur.id", "==", userId), // Filtrer par utilisateur.id
        orderBy("dateChangement", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const lastImage = querySnapshot.docs[0].data() as PhotoUtilisateur;
        setProfileImage(lastImage.lienPhoto);
      } else {
        console.log("Aucune image trouvée pour cet utilisateur.");
        setProfileImage("https://placeholder.svg?height=100&width=100"); // Image par défaut
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image :", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération de l'image.");
    }
  };

  useEffect(() => {
    fetchAuthenticatedUser();

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  // Téléverser l'image vers Cloudinary
  const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
    const cloudName = "dpxgvv6x5";
    const uploadPreset = "crypto_preset";

    try {
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      if (!fileInfo.exists) {
        throw new Error("Le fichier n'existe pas");
      }

      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append("file", `data:image/jpeg;base64,${base64}`);
      formData.append("upload_preset", uploadPreset);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${uploadResponse.status}`);
      }

      const data = await uploadResponse.json();

      if (data.secure_url) {
        console.log(" success :", data.secure_url);
        return data.secure_url;
      } else {
        console.error("echec :", data);
        throw new Error(data.error?.message || "Échec du téléversement");
      }
    } catch (error) {
      console.error("erreur :", error);
      throw error;
    }
  };

  const saveImage = async (imageUrl: string): Promise<void> => {
    if (!user) {
      console.error("Utilisateur non authentifié");
      Alert.alert("Erreur", "Aucun utilisateur n'est connecté.");
      return;
    }

    try {
      await addDoc(collection(db, "PhotoUtilisateur"), {
        id: null,
        dateChangement: serverTimestamp(),
        utilisateur: user, // Enregistrer l'utilisateur comme un objet
        lienPhoto: imageUrl,
      });
      console.log("Image sauvegardée avec succès");
      setProfileImage(imageUrl);
      Alert.alert("Photo de profil", " Mise à jour effectuée !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'image :", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sauvegarde de l'image.");
    }
  };

  // Changer la photo de profil
  const handleChangeProfilePicture = async (): Promise<void> => {
    if (!cameraPermission) {
      Alert.alert("Permission requise", "Vous devez autoriser l'accès à la caméra pour changer la photo de profil.");
      return;
    }

    setUploading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);

        const imageUrl = await uploadImageToCloudinary(imageUri);
        await saveImage(imageUrl);
      }
    } catch (error) {
      console.error("Erreur lors de la capture de l'image :", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la capture de l'image.");
    } finally {
      setUploading(false);
    }
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.username}>Chargement...</Text>
      </View>
    );
  }

  // Aucun utilisateur connecté
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.username}>Aucun utilisateur connecté.</Text>
      </View>
    );
  }

  // Affichage pendant le téléversement
  if (uploading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00A8E8" />
        <Text style={styles.username}>Mise a jour...</Text>
      </View>
    );
  }

  // Affichage normal
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <TouchableOpacity onPress={handleChangeProfilePicture} style={styles.changeImageButton}>
          <Ionicons name="camera" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.username}>{user.nomUtilisateur}</Text>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A192F",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeImageButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#00A8E8",
    borderRadius: 20,
    padding: 8,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#00A8E8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});