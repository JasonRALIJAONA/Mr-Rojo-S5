// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import LoginForm from './components/login/LoginForm'; // Importez le composant LoginPage

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <LoginForm /> {/* Utilisez le composant LoginPage ici */}
    </SafeAreaView>
  );
}