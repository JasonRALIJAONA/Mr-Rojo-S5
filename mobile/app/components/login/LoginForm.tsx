import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoginFormValid = email && password;

  const handleSubmit = () => {
    // Ajoutez ici la logique pour gérer la soumission du formulaire
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre email"
        placeholderTextColor="#64748b" // Ajouté ici
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Entrez votre mot de passe"
        placeholderTextColor="#64748b" // Ajouté ici
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, !isLoginFormValid && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!isLoginFormValid}
      >
        <Text style={styles.buttonText}>Continuer avec l'idP</Text>
      </TouchableOpacity>

      {/* Links */}
      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#0a1a2f', // Fond bleu nuit
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#1e3a8a', // Bordure bleu foncé
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#1e293b', // Fond input bleu ardoise
    color: '#ffffff', // Texte blanc
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#2563eb', // Bleu vif (accent)
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#2563eb', // Ombre néon
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Pour Android
  },
  disabledButton: {
    backgroundColor: '#334155', // Bleu grisâtre pour bouton désactivé
    shadowColor: 'transparent', // Pas d'ombre quand désactivé
  },
  buttonText: {
    color: '#ffffff', // Texte blanc
    fontWeight: 'bold',
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  linkText: {
    color: '#60a5fa', // Bleu clair pour les liens
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});