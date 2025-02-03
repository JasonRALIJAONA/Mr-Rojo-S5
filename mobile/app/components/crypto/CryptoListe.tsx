import React from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import CryptoCard from './CryptoCard';
import axios from "axios";

const baseUrl = 'http://localhost:8080/api';
let cards = [];

  // Invoking the get method to perform a GET request
axios.get(`${baseUrl}/cryptos`).then((response) => {
    cards = response.data;
    console.log(response.data);
});

export default function CryptoListe(){
    return (
        <SafeAreaView style={{flex:1}}>
            {/* <View style={styles.headerContainer}>
                <Text style={styles.header}>Liste des cryptos</Text>
            </View> */}
            <FlatList
                data={cards}
                keyExtractor={(item)=>item.id}
                renderItem={({item}) => (
                    <CryptoCard
                        symbole={item.symbole}
                        nom={item.nom}
                        prix={item.prix}
                        username={item.username}
                        buttonText=""
                    />
                )}
                numColumns={3} 
                contentContainerStyle={styles.cardsContainer}>
            </FlatList>
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
  