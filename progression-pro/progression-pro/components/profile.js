import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Button, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getItem } from '../database/database'; // Função para buscar dados
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [lastMeasurement, setLastMeasurement] = useState(null);

  const handleAddMeasurement = () => {
    navigation.navigate('AddMeasurement'); // Navega para a tela de adicionar medição
  };

  useEffect(() => {
    // Função para buscar dados do usuário
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('users'); // Busca os dados do usuário do banco
        console.log(user);
        
        if (user) {
          const userObject = JSON.parse(user); // Desserializa a string JSON
          const userData = userObject[0]; // Acessa o primeiro objeto no array
          setUserData(userData); // Seta os dados no estado
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };
    const fetchLastMeasurement = async () => {
      try {
        // Aqui você deve substituir pelo método correto para buscar as medições
        const response = await AsyncStorage.getItem('physical_measurements');
        const measurement = JSON.parse(response);
        if (measurement && measurement.length > 0) {
          const last = measurement[measurement.length - 1]; // Pega a última medição
          setLastMeasurement(last);
        } else {
          setLastMeasurement(null); // Nenhuma medição encontrada
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as medições.');
      }
    };

    fetchUserData(); // Chama a função ao carregar o componente
    fetchLastMeasurement(); // Chama a função para buscar a última medição
  }, []);
  

  // Exibe um carregamento se os dados do usuário ainda não estiverem prontos
  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando dados do usuário...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Seção do Perfil */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} // Avatar de exemplo
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userData.nome}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
        <View style={styles.userInfoRow}>
          <FontAwesome name="calendar" size={18} color="gray" />
          <Text style={styles.userInfoText}>Idade: {userData.idade}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <FontAwesome name="phone" size={18} color="gray" />
          <Text style={styles.userInfoText}>{userData.numero_telefone}</Text>
        </View>
      </View>

      {/* Botão para ir à tela de cadastro de medições */}
      <View style={styles.buttonContainer}>
        <Button
          title="Composição Corporal"
          onPress={ handleAddMeasurement } // Navega para a nova tela
        />
      </View>

      {/* Seção de exibição da última medição */}
      <View style={styles.measurementContainer}>
        <Text style={styles.measurementTitle}>Última Ficha de Medição</Text>
        {lastMeasurement ? (
          <View style={styles.measurementCard}>
            <Text style={styles.measurementText}>Data: {lastMeasurement.data_medicao}</Text>
            <Text style={styles.measurementText}>Peso: {lastMeasurement.peso} kg</Text>
            <Text style={styles.measurementText}>Altura: {lastMeasurement.altura} cm</Text>
            <Text style={styles.measurementText}>Peito: {lastMeasurement.peito} cm</Text>
            <Text style={styles.measurementText}>Cintura: {lastMeasurement.cintura} cm</Text>
            <Text style={styles.measurementText}>Quadril: {lastMeasurement.quadril} cm</Text>
          </View>
        ) : (
          <Text style={styles.noMeasurementText}>Nenhuma ficha de medição disponível.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userInfoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    padding: 20,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  measurementContainer: {
    padding: 20,
  },
  measurementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  measurementCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  measurementText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  noMeasurementText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default ProfileScreen;
