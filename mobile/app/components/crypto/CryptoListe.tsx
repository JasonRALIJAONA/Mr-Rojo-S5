import React from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import CryptoCard from './CryptoCard';

const cards = [
    { id: '1', nom: 'Bitcoin', prix: '$45,000', username: 'satoshi_nakamoto' },
    { id: '2', nom: 'Ethereum', prix: '$3,200', username: 'vitalik_buterin' },
    { id: '3', nom: 'Cardano', prix: '$1.50', username: 'charles_hoskinson' },
    { id: '4', nom: 'Dogecoin', prix: '$0.25', username: 'elon_musk' },
    { id: '5', nom: 'Polkadot', prix: '$28', username: 'gavin_wood' },
  ];

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
                        symbole={item.nom}
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
  