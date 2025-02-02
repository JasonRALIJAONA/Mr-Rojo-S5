import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  PinValidation: { email: string };
};

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoginFormValid = email.includes('@') && password.length > 0;

  const handleLogin = async () => {
    if (!isLoginFormValid) return;
    try {
      const response = await axios.post('http://localhost:80/api/utilisateur/login', {
        Email: email,
        Password: password,
      });
      if (response.status === 200) {
        Alert.alert('Succès', 'Connexion réussie.');
        navigation.navigate('PinValidation', { email });
      } else {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Problème de connexion.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Entrez votre mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity 
        style={[styles.button, !isLoginFormValid && styles.buttonDisabled]} 
        onPress={handleLogin} 
        disabled={!isLoginFormValid}
      >
        <Text style={styles.buttonText}>Continuer avec l'idP</Text>
      </TouchableOpacity>
    </View>
  );
};

const PinValidation: React.FC<{ route: { params: { email: string } }; navigation: any }> = ({ route, navigation }) => {
  const { email } = route.params;
  const [pin, setPin] = useState('');
  const isPinFormValid = pin.length === 6;

  const handlePinSubmit = async () => {
    if (!isPinFormValid) return;
    try {
      const response = await axios.post('http://localhost:80/api/utilisateur/ValiderPin', {
        Pin: pin,
        Email: email,
      });
      if (response.status === 200) {
        Alert.alert('Succès', 'PIN validé.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erreur', 'PIN incorrect.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Problème de connexion.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validation du PIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre PIN"
        keyboardType="numeric"
        maxLength={6}
        value={pin}
        onChangeText={setPin}
      />
      <TouchableOpacity 
        style={[styles.button, !isPinFormValid && styles.buttonDisabled]} 
        onPress={handlePinSubmit} 
        disabled={!isPinFormValid}
      >
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20 },
  input: { width: '80%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff', marginBottom: 10 },
  button: { width: '80%', padding: 15, backgroundColor: '#1e3a8a', borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export { Login, PinValidation };
