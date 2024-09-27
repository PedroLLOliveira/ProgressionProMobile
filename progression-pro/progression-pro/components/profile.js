import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getItem } from "../database/database"; // Função para buscar dados
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [lastMeasurement, setLastMeasurement] = useState(null);

  const handleAddMeasurement = () => {
    navigation.navigate("AddMeasurement");
  };

  useEffect(() => {
    // Função para buscar dados do usuário
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("users"); // Busca os dados do usuário do banco
        console.log(user);

        if (user) {
          const userObject = JSON.parse(user); // Desserializa a string JSON
          const userData = userObject[0]; // Acessa o primeiro objeto no array
          setUserData(userData); // Seta os dados no estado
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    };
    const fetchLastMeasurement = async () => {
      try {
        // Aqui você deve substituir pelo método correto para buscar as medições
        const response = await AsyncStorage.getItem("physical_measurements");
        const measurement = JSON.parse(response);
        if (measurement && measurement.length > 0) {
          const last = measurement[measurement.length - 1]; // Pega a última medição
          setLastMeasurement(last);
          console.log(measurement);
        } else {
          setLastMeasurement(null); // Nenhuma medição encontrada
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as medições.");
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
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} // Avatar de exemplo
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
        <Button title="Composição Corporal" onPress={handleAddMeasurement} />
      </View>

      {/* Seção de exibição da última medição */}
      <View style={styles.measurementContainer}>
        {lastMeasurement ? (
          <View style={styles.containerDC}>
            <Text style={styles.measurementTitle}>Última Ficha de Medição {lastMeasurement.data_medicao}</Text>
            <Text style={styles.measurementSubTitle}>Densidade Corporal</Text>
            <View style={styles.densidadeTable}>
              <View style={styles.column}>
                <Text>Gordura Ideal: {lastMeasurement.gordura_ideal}%</Text>
                <Text>Gordura Atual: {lastMeasurement.gordura_atual}%</Text>
                <Text>Peso Magro: {lastMeasurement.peso_magro} kg</Text>
                <Text>IMC: {lastMeasurement.imc}</Text>
              </View>
              <View style={styles.column}>
                <Text>Peso Gordo: {lastMeasurement.peso_gordo} kg</Text>
                <Text>Peso Ideal: {lastMeasurement.peso_ideal} kg</Text>
              </View>
            </View>
            <Text style={styles.measurementSubTitle}>Medidas Corporais</Text>
            <View style={styles.densidadeTable}>
              <View style={styles.column}>
                <Text></Text>
                <Text style={styles.textColumn}>Antebraco</Text>
                <Text style={styles.textColumn}>Bíceps Relaxado</Text>
                <Text style={styles.textColumn}>Bíceps Contraido</Text>
                <Text style={styles.textColumn}>Coxa Proximal</Text>
                <Text style={styles.textColumn}>Coxa Medial</Text>
                <Text style={styles.textColumn}>Coxa Distal</Text>
                <Text style={styles.textColumn}>Paturrilha</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.labelColumn}>Esquerdo(cm)</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.antebraco_esquerdo}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.biceps_relaxado_esquerdo}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.biceps_contraido_esquerdo}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.coxa_proximal_esquerda}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.coxa_medial_esquerda}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.coxa_distal_esquerda}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.labelColumn}>Direito(cm)</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.antebraco_direito}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.biceps_relaxado_direito}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.biceps_contraido_direito}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.coxa_proximal_direita}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.coxa_medial_direita}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.coxa_distal_direita}</Text>
              </View>
            </View>
            <Text style={styles.measurementSubTitle}>Circunferências</Text>
            <View style={styles.densidadeTable}>
              <View style={styles.column}>
                <Text></Text>
                <Text style={styles.textColumn}>Abdômen</Text>
                <Text style={styles.textColumn}>Cintura</Text>
                <Text style={styles.textColumn}>Quadril</Text>
                <Text style={styles.textColumn}>Torax</Text>
                <Text style={styles.textColumn}>Ombro</Text>
                <Text style={styles.textColumn}>Pescoço</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.labelColumn}>(cm)</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.abdomen}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.cintura}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.quadril}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.torax}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.ombro}</Text>
                <Text style={styles.textColumnCenter}>{lastMeasurement.pescoco}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.measurementTitle}>Última Ficha de Medição</Text>
            <Text style={styles.noMeasurementText}>
              Nenhuma ficha de medição disponível.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
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
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userInfoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    padding: 20,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  measurementContainer: {
    padding: 20,
  },
  containerDC: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  measurementTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 15,
    textAlign: "center",
  },
  measurementSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 15,
    textAlign: "center",
  },
  
  densidadeTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  labelColumn: {
    fontSize: 10,
    fontWeight: "500",
    color: "#444",
    marginBottom: 8,
    textAlign: "center",
  },
  
  textColumn: {
    fontSize: 12,
    fontWeight: "500",
    color: "#444",
    marginBottom: 8,
    textAlign: "left",
  },
  
  textColumnCenter: {
    fontSize: 12,
    fontWeight: "500",
    color: "#444",
    textAlign: "center",
    marginBottom: 8,
  },
  
  measurementText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  
  noMeasurementText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    fontStyle: "italic",
  },
  
});

export default ProfileScreen;
