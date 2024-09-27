import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { authenticateUser } from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para verificar se o token já existe
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // Se o token existir, navegue diretamente para a tela principal
        navigation.replace('MainTabs');
      }
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
    }
  };

  // Verifica o token quando o componente é montado
  useEffect(() => {
    checkToken();
  }, []);

  // Função para lidar com o login
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    authenticateUser(
      email,
      password,
      async (user) => {
        Alert.alert('Sucesso', `Bem-vindo(a), ${user.nome}!`);
        
        // Salva o token (ou informações do usuário) no AsyncStorage
        await AsyncStorage.setItem('userToken', JSON.stringify(user));
        
        // Navega para a tela principal
        navigation.replace('MainTabs');
      },
      () => {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Não tem uma conta? Registre-se
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  link: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
