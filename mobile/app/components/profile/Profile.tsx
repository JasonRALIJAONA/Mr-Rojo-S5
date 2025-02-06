"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { Camera } from "expo-camera"

export default function Profile() {
  const [profileImage, setProfileImage] = useState("https://placeholder.svg?height=100&width=100")
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)

  const uploadImageToCloudinary = async (imageUri: string) => {
    const cloudName = "dpxgvv6x5"; // Remplace par ton cloud_name
    const uploadPreset = "crypto_preset"; // Remplace par ton upload_preset
  
    try {
      // 🔥 Convertir l'image locale en blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      const formData = new FormData();
      formData.append("file", blob, "photo.jpg"); // On envoie le blob
      formData.append("upload_preset", uploadPreset);
  
      // 🔥 Envoyer vers Cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
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
  

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setCameraPermission(status === "granted")
    })()
  }, [])

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
          console.log("Selected image URI:", imageUri); // 🔥 Vérification
  
          setProfileImage(imageUri); // Mise à jour de l'état
  
          try {
            const imageUrl = await uploadImageToCloudinary(imageUri);
            console.log("✅ Image uploaded successfully. URL:", imageUrl);
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
      <Text style={styles.username}>Username</Text>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
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
})

