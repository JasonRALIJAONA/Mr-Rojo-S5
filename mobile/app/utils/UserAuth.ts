// utils/authUtils.js
import { Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig'; // Assurez-vous d'importer correctement votre instance Firebase
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getAuthenticatedUser = async () => {
    try {
        const userCredential = auth.currentUser;
        if (!userCredential) {
            console.error("Utilisateur non authentifié");
            Alert.alert("Erreur", "Aucun utilisateur n'est connecté.");
            return null;
        }

        const userCollection = collection(db, "Utilisateur");
        const q = query(userCollection, where("email", "==", userCredential.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log(querySnapshot.docs[0].data().id); // Retourne uniquement les données du document
            return querySnapshot.docs[0].data();
        } else {
            Alert.alert("Erreur", "Utilisateur introuvable.");
            return null;
        }
        
    } catch (error) {
        console.error("Erreur de récupération des données :", error);
        Alert.alert("Erreur de connexion", error.message);
        return null;
    }
};

export const getUserExpoPushToken = async () => {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return null;

        const tokenCollection = collection(db, "UtilisateurPushToken"); // Assurez-vous que c'est bien le nom dans Firestore
        const q = query(tokenCollection, where("utilisateur.id", "==", user.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const tokenData = querySnapshot.docs[0].data();
            console.log("Expo Push Token :", tokenData.expoToken);
            return tokenData;
        } else {
            console.error("Aucun token trouvé pour cet utilisateur.");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du token :", error);
        return null;
    }
};
