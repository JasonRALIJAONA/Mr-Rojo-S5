import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import CryptoCard from './CryptoCard';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function CryptoListe() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
              const querySnapshot = await getDocs(collection(db, "cryptomonnaie"));
              const cryptos = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setCards(cryptos);
              console.log(cryptos);
            } catch (error) {
              console.error("Erreur lors du chargement des données : ", error);
            }
          };

        fetchCryptos();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={cards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CryptoCard
                        symbole={item.symbole}
                        nom={item.nom}
                        idCryptomonnaie={item.id}
                        buttonText=""
                    />
                )}
                numColumns={3}
                contentContainerStyle={styles.cardsContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 16,
        backgroundColor: '#0F2573',
    },
    header: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardsContainer: {
        padding: 16,
    },
});