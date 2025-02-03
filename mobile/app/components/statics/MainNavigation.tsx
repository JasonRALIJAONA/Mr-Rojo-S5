import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

import PorteFeuille from "../porte-feuille/PorteFeuille"
import CryptoListe from "../crypto/CryptoListe"
import Transactions from "../transactions/Transactions"

const Tab = createBottomTabNavigator()

export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Porte-feuille") {
            iconName = focused ? "wallet" : "wallet-outline"
          } else if (route.name === "Transactions") {
            iconName = focused ? "list" : "list-outline"
          } else if (route.name === "Cours actuels") {
            iconName = focused ? "trending-up" : "trending-up-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#00A8E8", // Electric blue
        tabBarInactiveTintColor: "#B0C4DE", // Light grayish blue
        tabBarStyle: {
          backgroundColor: "#0A192F", // Deep dark blue
          borderTopColor: "#112D4E", // Slightly lighter blue border
        },
        headerStyle: {
          backgroundColor: "#0A192F", // Dark blue header
        },
        headerTintColor: "#FFFFFF", // White text in the header
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen name="Porte-feuille" component={PorteFeuille} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Cours actuels" component={CryptoListe} />
    </Tab.Navigator>
  )
}
