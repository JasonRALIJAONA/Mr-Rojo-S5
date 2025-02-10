"use client"

import { useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import AmountModal from "./AmountModal"

export default function ActionButtons() {
  const [modalVisible, setModalVisible] = useState(false)
  const [actionType, setActionType] = useState<"Recuperer" | "Deposer">("Recuperer")

  const handleButtonPress = (type: "Recuperer" | "Deposer") => {
    setActionType(type)
    setModalVisible(true)
  }

  const handleSubmit = (amount: string) => {
    // Handle the submitted amount here
    console.log(`${actionType} amount: ${amount}`)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("Recuperer")}>
        <AntDesign name="arrowup" size={36} color="#FFFFFF" />
        <Text style={styles.buttonText}>Recuperer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("Deposer")}>
        <AntDesign name="arrowdown" size={36} color="#FFFFFF" />
        <Text style={styles.buttonText}>Deposer</Text>
      </TouchableOpacity>
      <AmountModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        actionType={actionType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    marginTop: 5,
  },
})

