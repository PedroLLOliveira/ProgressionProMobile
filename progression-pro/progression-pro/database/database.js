import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

// Função para salvar um item no AsyncStorage
const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Erro ao salvar no AsyncStorage:", error);
  }
};

// Função para obter um item do AsyncStorage
const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Erro ao buscar do AsyncStorage:", error);
  }
};

// Função para remover um item do AsyncStorage
const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Erro ao remover do AsyncStorage:", error);
  }
};

// Função para criar ou obter a tabela de usuários
export const createUserTable = async () => {
  const users = await getItem("users");
  if (!users) {
    await setItem("users", []);
    console.log("Tabela de usuários criada com sucesso!");
  } else {
    console.log("Tabela de usuários já existe.");
  }
};

// Função para criar ou obter a tabela de medições físicas
export const createPhysicalMeasurementTable = async () => {
  const physicalMeasurements = await getItem("physical_measurements");
  if (!physicalMeasurements) {
    await setItem("physical_measurements", []);
    console.log("Tabela de medições físicas criada com sucesso!");
  } else {
    console.log("Tabela de medições físicas já existe.");
  }
};

// Função para inserir dados na tabela PhysicalMeasurement
export const insertPhysicalMeasurement = async (
  user_id,
  data_medicao,
  peso,
  altura,
  meta_gordura,
  subescapular,
  tricipital,
  peitoral,
  axilar_media,
  supra_iliaca,
  abdominal,
  coxa,
  gordura_ideal,
  gordura_atual,
  peso_magro,
  peso_gordo,
  peso_ideal,
  imc,
  antebraco_direito,
  antebraco_esquerdo,
  biceps_relaxado_direito,
  biceps_relaxado_esquerdo,
  biceps_contraido_direito,
  biceps_contraido_esquerdo,
  coxa_proximal_direita,
  coxa_proximal_esquerda,
  coxa_medial_direita,
  coxa_medial_esquerda,
  coxa_distal_direita,
  coxa_distal_esquerda,
  panturrilha_esquerda,
  panturrilha_direita,
  abdomen,
  cintura,
  quadril,
  torax,
  ombro,
  pescoco
) => {
  const physicalMeasurements = await getItem("physical_measurements");
  const newMeasurement = {
    id: physicalMeasurements.length + 1,
    user_id,
    data_medicao,
    peso,
    altura,
    meta_gordura,
    subescapular,
    tricipital,
    peitoral,
    axilar_media,
    supra_iliaca,
    abdominal,
    coxa,
    gordura_ideal,
    gordura_atual,
    peso_magro,
    peso_gordo,
    peso_ideal,
    imc,
    antebraco_direito,
    antebraco_esquerdo,
    biceps_relaxado_direito,
    biceps_relaxado_esquerdo,
    biceps_contraido_direito,
    biceps_contraido_esquerdo,
    coxa_proximal_direita,
    coxa_proximal_esquerda,
    coxa_medial_direita,
    coxa_medial_esquerda,
    coxa_distal_direita,
    coxa_distal_esquerda,
    panturrilha_esquerda,
    panturrilha_direita,
    abdomen,
    cintura,
    quadril,
    torax,
    ombro,
    pescoco,
  };

  physicalMeasurements.push(newMeasurement);
  await setItem("physical_measurements", physicalMeasurements);
  console.log("Dados de medição física inseridos com sucesso!");
};

// Função para inserir um usuário
export const insertUser = async (
  nome,
  idade,
  email,
  senha,
  foto,
  data_nascimento,
  numero_telefone
) => {
  const users = await getItem("users");
  const newUser = {
    id: users.length + 1,
    nome,
    idade,
    email,
    senha,
    foto,
    data_nascimento,
    numero_telefone,
  };

  users.push(newUser);
  await setItem("users", users);
  console.log("Usuário inserido com sucesso!");
};

// Função para gerar um token de usuário
const generateToken = () => {
  return uuidv4(); // Gera um token único
};

// Função para autenticar um usuário e salvar o token
export const authenticateUser = async (email, senha, onSuccess, onFailure) => {
  const users = await getItem("users");
  const user = users.find((u) => u.email === email && u.senha === senha);

  if (user) {
    const token = generateToken();
    await setItem("auth_token", token); // Salva o token no AsyncStorage
    onSuccess(user, token);
  } else {
    onFailure();
  }
};

// Função para verificar se o usuário já está autenticado
export const isAuthenticated = async () => {
  const token = await getItem("auth_token");
  return token !== null; // Retorna true se o token existir
};

// Função para criar ou obter a tabela Movements
export const createMovementsTable = async () => {
  const movements = await getItem("movements");
  if (!movements) {
    await setItem("movements", []);
    console.log("Tabela de movimentos criada com sucesso!");
  } else {
    console.log("Tabela de movimentos já existe.");
  }
};

// Função para criar ou obter a tabela Workouts
export const createWorkoutsTable = async () => {
  const workouts = await getItem("workouts");
  if (!workouts) {
    await setItem("workouts", []);
    console.log("Tabela de treinos criada com sucesso!");
  } else {
    console.log("Tabela de treinos já existe.");
  }
};

// Função para criar ou obter a tabela WorkoutMovements
export const createWorkoutMovementsTable = async () => {
  const workoutMovements = await getItem("workout_movements");
  if (!workoutMovements) {
    await setItem("workout_movements", []);
    console.log("Tabela de movimentos em treinos criada com sucesso!");
  } else {
    console.log("Tabela de movimentos em treinos já existe.");
  }
};

// Função para inserir um movimento
export const insertMovement = async (nome, grupo, explicacao, link_imagem) => {
  const movements = await getItem("movements");
  const newMovement = {
    id: movements.length + 1,
    nome,
    grupo,
    explicacao,
    link_imagem,
  };

  movements.push(newMovement);
  await setItem("movements", movements);
  console.log("Movimento inserido com sucesso!");
};

// Função para inserir um treino
export const insertWorkout = async (user_id, explicacao) => {
  const workouts = await getItem("workouts");
  const newWorkout = {
    id: workouts.length + 1,
    user_id,
    explicacao,
  };

  workouts.push(newWorkout);
  await setItem("workouts", workouts);
  console.log("Treino inserido com sucesso!");
  return newWorkout
};

// Função para inserir um movimento em um treino
export const insertWorkoutMovement = async (
  workout_id,
  movement_id,
  series,
  repeticoes,
  descanso
) => {
  const workoutMovements = await getItem("workout_movements");
  const newWorkoutMovement = {
    id: workoutMovements.length + 1,
    workout_id,
    movement_id,
    series,
    repeticoes,
    descanso,
  };

  workoutMovements.push(newWorkoutMovement);
  await setItem("workout_movements", workoutMovements);
  console.log("Movimento adicionado ao treino com sucesso!");
  return newWorkoutMovement
};

// Função para inicializar o banco de dados
export const initializeDatabase = async () => {
  await createUserTable();
  await createPhysicalMeasurementTable();
  await createMovementsTable();
  await createWorkoutsTable();
  await createWorkoutMovementsTable();
};
