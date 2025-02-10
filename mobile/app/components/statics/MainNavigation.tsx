import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { RootStackParamList, BottomTabParamList } from "../../type/type";
import CryptoListe from "../crypto/CryptoListe";
import Transactions from "../transactions/Transactions";
import Wallet from "../porte-feuille/Wallet";
import Profile from "../profile/Profile";
import LoginForm from "../login/LoginForm";
import listenForValidationMvt from "@/app/utils/Listener";
import { getAuthenticatedUser, getUserExpoPushToken } from "@/app/utils/UserAuth";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

function BottomTabNavigator({ userId, expoPushToken }: { userId: number; expoPushToken: string }) {
  useEffect(() => {
    if (userId && expoPushToken) {
      console.log(userId);
      listenForValidationMvt(userId, expoPushToken);
    }
  }, [userId, expoPushToken]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help";

          if (route.name === "Wallet") iconName = focused ? "wallet" : "wallet-outline";
          else if (route.name === "Cours actuels") iconName = focused ? "trending-up" : "trending-up-outline";
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
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
      <Tab.Screen name="Cours actuels" component={CryptoListe} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function MainNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  // Configurer les notifications push
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const user = await getAuthenticatedUser();
          if (user && user.id) {
            setUserId(user.id);

            // Appeler la fonction pour obtenir le token Expo
            const token = await registerForPushNotificationsAsync();
            if (token) {
              setExpoPushToken(token);
              listenForValidationMvt(user.id, token);
            } else {
              console.error("Aucun token trouvé pour cet utilisateur.");
            }
          } else {
            console.error("Utilisateur non authentifié ou introuvable.");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login">
          {(props) => <LoginForm {...props} onLogin={() => setIsAuthenticated(true)} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Main">
          {(props) => (
            <BottomTabNavigator
              {...props}
              userId={userId!}
              expoPushToken={expoPushToken!}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
