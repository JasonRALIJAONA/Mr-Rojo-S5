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

        const userCollection = collection(db, "Utilisateur_idp");
        const q = query(userCollection, where("email", "==", userCredential.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data(); // Retourne uniquement les données du document
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
