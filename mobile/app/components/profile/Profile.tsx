"use client";

import * as FileSystem from "expo-file-system";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

export default function Profile() {
  const [profileImage, setProfileImage] = useState("https://placeholder.svg?height=100&width=100");
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const user = auth.currentUser;
  if (!user) {
    console.error("Utilisateur non authentifié");
    return;
  }

  // Fetch the last uploaded image for the current user
  const fetchLastUploadedImage = async () => {

    try {
      const q = query(
        collection(db, "photo_utilisateur"),
        where("id_utilisateur", "==", user.uid),
        orderBy("date_changement", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const lastImage = querySnapshot.docs[0].data();
        setProfileImage(lastImage.lien_photo); // Set the last uploaded image
      } else {
        console.log("No image found for the user.");
      }
    } catch (error) {
      console.error("Error fetching last uploaded image:", error);
    }
  };

  useEffect(() => {
    // Fetch the last uploaded image when the component mounts
    fetchLastUploadedImage();

    // Request camera permissions
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const uploadImageToCloudinary = async (imageUri: string) => {
    const cloudName = "dpxgvv6x5"; // Replace with your cloud_name
    const uploadPreset = "crypto_preset"; // Replace with your upload_preset

    try {
      // Read the file as a base64 string
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      if (!fileInfo.exists) {
        throw new Error("File does not exist");
      }

      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append("file", `data:image/jpeg;base64,${base64}`);
      formData.append("upload_preset", uploadPreset);

      // Send the request to Cloudinary
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
        throw new Error(`HTTP error! Status: ${uploadResponse.status}`);
      }

      const data = await uploadResponse.json();

      if (data.secure_url) {
        console.log("✅ Image upload successful:", data.secure_url);
        return data.secure_url;
      } else {
        console.error("❌ Upload failed, no secure_url:", data);
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("❌ Error during upload:", error);
      throw error;
    }
  };

  const saveImage = async (imageUrl: string) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Utilisateur non authentifié");
      return;
    }

    try {
      await addDoc(collection(db, "photo_utilisateur"), {
        date_changement: serverTimestamp(),
        id_utilisateur: user.uid,
        lien_photo: imageUrl,
      });
      console.log("Image saved successfully");
      setProfileImage(imageUrl); // Update the profile image state
      Alert.alert("Photo de profil", "✅ Mise à jour effectuée!");
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleChangeProfilePicture = async () => {
    if (cameraPermission) {
      try {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        console.log("ImagePicker result:", result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const imageUri = result.assets[0].uri;
          console.log("Selected image URI:", imageUri);

          setProfileImage(imageUri); // Update the state with the new image

          try {
            const imageUrl = await uploadImageToCloudinary(imageUri);
            await saveImage(imageUrl);
          } catch (error) {
            console.error("❌ Failed to upload image:", error);
            Alert.alert("Upload Failed", "Failed to upload the image to Cloudinary. Please try again.");
          }
        } else {
          console.log("❌ Image picking was cancelled.");
        }
      } catch (error) {
        console.error("❌ Error capturing image:", error);
        Alert.alert("Error", "An error occurred while capturing the image. Please try again.");
      }
    } else {
      Alert.alert("Permission Required", "Camera permission is required to change profile picture.", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <TouchableOpacity onPress={handleChangeProfilePicture} style={styles.changeImageButton}>
          <Ionicons name="camera" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.username}>{user.email}</Text>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Deconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

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