import 'react-native-get-random-values';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import ProfileScreen from './components/profile';
import LoginScreen from './components/login';
import RegisterScreen from './components/register';
import HomeScreen from './components/home';
import WorkoutScreen from './components/workout';
import AddMeasurementScreen from './components/addMeasurement';
import AddWorkoutScreen from './components/addWorkout'
import { initializeDatabase } from './database/database';
import SelectMoviments from './components/selectMoviments';
import ListWorkoutMoviments from './components/listWorkoutMoviments';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const ListWorkoutMovimentsContext = React.createContext([])

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'Treinos') {
            iconName = 'dumbbell';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            iconName = 'user';
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Treinos" component={WorkoutScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [ listWorkoutMoviments, setListWorkoutMoviments ] = React.useState([])

  // Usando useEffect para garantir que as tabelas sejam criadas ao carregar o app
  React.useEffect(() => {
    initializeDatabase(); // Função para inicializar o banco de dados
  }, []);

  return (
    <ListWorkoutMovimentsContext.Provider
      value={{ listWorkoutMoviments, setListWorkoutMoviments }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="AddMeasurement" component={AddMeasurementScreen} />
          <Stack.Screen name="AddWorkoutScreen" component={AddWorkoutScreen} />
          <Stack.Screen name="SelectMoviments" component={SelectMoviments} />      
          <Stack.Screen name="ListWorkoutMoviments" component={ListWorkoutMoviments} />      
        </Stack.Navigator>
      </NavigationContainer>
    </ListWorkoutMovimentsContext.Provider>
  );
}
