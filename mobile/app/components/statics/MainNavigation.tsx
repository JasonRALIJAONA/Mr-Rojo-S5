import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { RootStackParamList, BottomTabParamList } from "./type"

import CryptoListe from "../crypto/CryptoListe"
import Transactions from "../transactions/Transactions"
import Wallet from "../porte-feuille/Wallet"
import Profile from "../profile/Profile"
import LoginForm from "../login/LoginForm"

// Déclaration des navigateurs avec les types
const Tab = createBottomTabNavigator<BottomTabParamList>()
const Stack = createStackNavigator<RootStackParamList>()

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help"

          if (route.name === "Wallet") iconName = focused ? "wallet" : "wallet-outline"
          // else if (route.name === "Transactions") iconName = focused ? "list" : "list-outline"
          else if (route.name === "Cours actuels") iconName = focused ? "trending-up" : "trending-up-outline"
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline"

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#00A8E8",
        tabBarInactiveTintColor: "#B0C4DE",
        tabBarStyle: { backgroundColor: "#0A192F", borderTopColor: "#112D4E" },
        headerStyle: { backgroundColor: "#0A192F" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
      })}
    >
      <Tab.Screen name="Wallet" component={Wallet} />
      {/* <Tab.Screen name="Transactions" component={Transactions} /> */}
      <Tab.Screen name="Cours actuels" component={CryptoListe} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default function MainNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login">
          {(props) => <LoginForm {...props} onLogin={() => setIsAuthenticated(true)} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      )}
    </Stack.Navigator>
  )
}
