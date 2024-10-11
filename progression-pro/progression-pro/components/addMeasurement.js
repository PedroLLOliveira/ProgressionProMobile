import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import CheckBox from "react-native-check-box";
import { insertPhysicalMeasurement } from "../database/database";

const AddMeasurementScreen = ({ route, navigation }) => {
  // const { userId } = route.params;
  const [step, setStep] = useState(1);
  const [selectedProtocols, setSelectedProtocols] = useState({
    pollock_7_dobras: false,
    guedes_3_dobras: false,
    weltman_obesos: false,
    pollock_3_dobras: false,
    bioimpedancia: false,
    faulkner_4_dobras: false,
  });
  // Estados para armazenar os valores das medições
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [meta_gordura, setMetaGordura] = useState("");
  const [subescapular, setSubescapular] = useState("");
  const [tricipital, setTricipital] = useState("");
  const [peitoral, setPeitoral] = useState("");
  const [axilar_media, setAxilarMedia] = useState("");
  const [supra_iliaca, setSupraIliaca] = useState("");
  const [abdominal, setAbdominal] = useState("");
  const [coxa, setCoxa] = useState("");
  const [gordura_ideal, setGorduraIdeal] = useState("");
  const [gordura_atual, setGorduraAtual] = useState("");
  const [peso_magro, setPesoMagro] = useState("");
  const [peso_gordo, setPesoGordo] = useState("");
  const [peso_ideal, setPesoIdeal] = useState("");
  const [imc, setImc] = useState("");
  const [antebraco_direito, setAntebracoDireito] = useState("");
  const [antebraco_esquerdo, setAntebracoEsquerdo] = useState("");
  const [punho_direito, setPunhoDireito] = useState("");
  const [punho_esquerdo, setPunhoEsquerdo] = useState("");
  const [biceps_relaxado_direito, setBracoRelaxadoDireito] = useState("");
  const [biceps_relaxado_esquerdo, setBracoRelaxadoEsquerdo] = useState("");
  const [biceps_contraido_direito, setBracoContraidoDireito] = useState("");
  const [biceps_contraido_esquerdo, setBracoContraidoEsquerdo] = useState("");
  const [coxa_proximal_direita, setCoxaProximalDireita] = useState("");
  const [coxa_proximal_esquerda, setCoxaProximalEsquerda] = useState("");
  const [coxa_medial_direita, setCoxaMedialDireita] = useState("");
  const [coxa_medial_esquerda, setCoxaMedialEsquerda] = useState("");
  const [coxa_distal_direita, setCoxaDistalDireita] = useState("");
  const [coxa_distal_esquerda, setCoxaDistalEsquerda] = useState("");
  const [panturrilha_direita, setPanturrilhaDireita] = useState("");
  const [panturrilha_esquerda, setPanturrilhaEsquerda] = useState("");
  const [abdomen, setAbdomen] = useState("");
  const [cintura, setCintura] = useState("");
  const [quadril, setQuadril] = useState("");
  const [torax_normal, setToraxNormal] = useState("");
  const [torax_inspirado, setToraxInspirado] = useState("");
  const [torax_expirado, setToraxExpirado] = useState("");
  const [ombro, setOmbro] = useState("");
  const [pescoco, setPescoco] = useState("");

  const calculatePollock7Dobras = () => {
    const somaDobras =
      parseFloat(subescapular) +
      parseFloat(tricipital) +
      parseFloat(peitoral) +
      parseFloat(axilar_media) +
      parseFloat(supra_iliaca) +
      parseFloat(abdominal) +
      parseFloat(coxa);

    // adicionar validação para feiminio e masculino, adicionar sexo e idade por props vindo do profile do usuario, adicionar sexo ao objeto do
    const densidadeCorporal =
      1.112 -
      0.00043499 * somaDobras +
      0.00000055 * somaDobras ** 2 -
      0.00028826 * 20;
    const percentualGordura = 495 / densidadeCorporal - 450;
    console.log(densidadeCorporal);

    console.log("Percentual de gordura:", percentualGordura);
    console.log("Soma das dobras:", somaDobras);
    console.log("Peso:", peso);

    // Cálculo do peso gordo
    const pesoGordo = (peso * percentualGordura) / 100;

    // Cálculo do peso magro
    const pesoMagro = peso - pesoGordo;

    // Cálculo do IMC
    const imcCalculado = peso / (altura / 100) ** 2;

    // Cálculo da gordura ideal
    const gorduraIdeal = meta_gordura ? parseFloat(meta_gordura) : 15;

    // Cálculo do peso ideal
    const pesoIdeal = pesoMagro / (1 - gorduraIdeal / 100);

    // Atualizando os valores no estado
    setGorduraAtual(percentualGordura.toFixed(2));
    setPesoGordo(pesoGordo.toFixed(2));
    setPesoMagro(pesoMagro.toFixed(2));
    setImc(imcCalculado.toFixed(2));
    setPesoIdeal(pesoIdeal.toFixed(2));
    setGorduraIdeal(gorduraIdeal);
  };

  useEffect(() => {
    if (
      selectedProtocols.pollock_7_dobras &&
      peso &&
      altura &&
      subescapular &&
      tricipital &&
      peitoral &&
      axilar_media &&
      supra_iliaca &&
      abdominal &&
      coxa
    ) {
      calculatePollock7Dobras();
    }
  }, [
    selectedProtocols,
    peso,
    altura,
    subescapular,
    tricipital,
    peitoral,
    axilar_media,
    supra_iliaca,
    abdominal,
    coxa,
  ]);

  const handleCheckBoxChange = (protocol) => {
    setSelectedProtocols({
      ...selectedProtocols,
      [protocol]: !selectedProtocols[protocol],
    });
  };

  const handleAddMeasurement = async () => {
    try {
      const dataAtual = new Date();
      const dataFormatada = dataAtual.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      await insertPhysicalMeasurement(
        1,
        dataFormatada,
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
        punho_direito,
        punho_esquerdo,
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
        torax_normal,
        torax_inspirado,
        torax_expirado,
        ombro,
        pescoco
      );
      Alert.alert("Sucesso", "Medição adicionada com sucesso!");
      navigation.goBack(); // Retorna à tela anterior após o sucesso
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao adicionar a medição.");
    }
  };
  // Função para ir para a próxima etapa
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Função para voltar para a etapa anterior
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Etapa 1</Text>
          <Text style={styles.stepSubTitle}>SELECIONE O PROTOCOLO</Text>
          <View style={styles.protocoloContainer}>
            <View style={styles.column}>
              <CheckBox
                isChecked={selectedProtocols.pollock_7_dobras}
                onClick={() => handleCheckBoxChange("pollock_7_dobras")}
                rightText="Pollock (7 dobras)"
              />
              <CheckBox
                isChecked={selectedProtocols.guedes_3_dobras}
                onClick={() => handleCheckBoxChange("guedes_3_dobras")}
                rightText="Guedes (3 dobras)"
              />
              <CheckBox
                isChecked={selectedProtocols.weltman_obesos}
                onClick={() => handleCheckBoxChange("weltman_obesos")}
                rightText="Weltman (Obesos)"
              />
            </View>
            <View style={styles.column}>
              <CheckBox
                isChecked={selectedProtocols.pollock_3_dobras}
                onClick={() => handleCheckBoxChange("pollock_3_dobras")}
                rightText="Pollock (3 dobras)"
              />
              <CheckBox
                isChecked={selectedProtocols.bioimpedancia}
                onClick={() => handleCheckBoxChange("bioimpedancia")}
                rightText="Bioimpedância"
              />
              <CheckBox
                isChecked={selectedProtocols.faulkner_4_dobras}
                onClick={() => handleCheckBoxChange("faulkner_4_dobras")}
                rightText="Faulkner (4 dobras)"
              />
            </View>
          </View>
          <View style={styles.divide}></View>
          <Text style={styles.stepSubTitle}>MEDIDAS</Text>
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Peso</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={peso}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setPeso(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Altura</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={altura}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setAltura(text);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Meta Gordura</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={meta_gordura}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setMetaGordura(text);
                }}
              />
            </View>
          </View>
          <View style={styles.divide}></View>
          <Text style={styles.stepSubTitle}>DOBRAS CUTÂNEAS(EM MM)</Text>
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Subescapular</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={subescapular}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setSubescapular(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Tricipital</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={tricipital}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setTricipital(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Peitoral</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={peitoral}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setPeitoral(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Axilar-média</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={axilar_media}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setAxilarMedia(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Supra-ilíaca</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={supra_iliaca}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setSupraIliaca(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Abdominal</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={abdominal}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setAbdominal(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Coxa</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={coxa}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setCoxa(text);
                }}
              />
            </View>
          </View>

          <View style={styles.divide}></View>
          <Text style={styles.stepSubTitle}>RESULTADOS</Text>
          <View style={styles.resultContainer}>
            <View style={styles.column}>
              <Text style={styles.textColumn}>
                Gordura Ideal: {gordura_ideal}%
              </Text>
              <Text style={styles.textColumn}>
                Gordura Atual: {gordura_atual}%
              </Text>
              <Text style={styles.textColumn}>Peso Magro: {peso_magro} kg</Text>
              <Text style={styles.textColumn}>IMC: {imc}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.textColumn}>Peso Gordo: {peso_gordo} kg</Text>
              <Text style={styles.textColumn}>Peso Ideal: {peso_ideal} kg</Text>
            </View>
          </View>
          <View style={styles.divide}></View>

          <Text style={styles.stepSubTitle}>TABELA % GORDURA IDEAL</Text>
          <View style={styles.tableContainer}>
            {/* Cabeçalhos das colunas */}
            <View style={styles.row}>
              <Text style={styles.labelColumn}>Anos</Text>
              <Text style={styles.labelColumn}>18 a 29</Text>
              <Text style={styles.labelColumn}>30 a 39</Text>
              <Text style={styles.labelColumn}>40 a 49</Text>
              <Text style={styles.labelColumn}>50 a 59</Text>
              <Text style={styles.labelColumn}> +60</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelColumn}>Homens</Text>
              <Text style={styles.labelColumn}>14%</Text>
              <Text style={styles.labelColumn}>16%</Text>
              <Text style={styles.labelColumn}>17%</Text>
              <Text style={styles.labelColumn}>18%</Text>
              <Text style={styles.labelColumn}>21%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelColumn}>Mulheres</Text>
              <Text style={styles.labelColumn}>19%</Text>
              <Text style={styles.labelColumn}>21%</Text>
              <Text style={styles.labelColumn}>22%</Text>
              <Text style={styles.labelColumn}>23%</Text>
              <Text style={styles.labelColumn}>26%</Text>
            </View>
          </View>
          <View style={styles.divide}></View>

          <Text style={styles.stepSubTitle}>TABELA IMC</Text>
          <View style={styles.tableContainer}>
            {/* Cabeçalhos das colunas */}
            <View style={styles.row}>
              <Text style={styles.labelColumn}>Baixo:</Text>
              <Text style={styles.labelColumn}> -=18.5</Text>

              <Text style={styles.labelColumn}>Obes. Leve:</Text>
              <Text style={styles.labelColumn}> 30 a 34.9</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelColumn}>Ideal:</Text>
              <Text style={styles.labelColumn}> 18.5 a 24.9</Text>

              <Text style={styles.labelColumn}>Obes. Moderada:</Text>
              <Text style={styles.labelColumn}> 35 a 39.9</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelColumn}>Sobrepeso:</Text>
              <Text style={styles.labelColumn}> 25 a 29.9</Text>
              <Text style={styles.labelColumn}>Obes. Mórbida:</Text>
              <Text style={styles.labelColumn}> +40</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Próximo" onPress={handleNextStep} />
          </View>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Etapa 2</Text>
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Tórax Normal</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={torax_normal}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setToraxNormal(text);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Tórax Inspirado</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={torax_inspirado}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setToraxInspirado(text);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Tórax Expirado</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={torax_expirado}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setToraxExpirado(text);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Abdômen</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={abdomen}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setAbdomen(text);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Quadril</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={quadril}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setQuadril(text);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Cintura</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={cintura}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setCintura(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Ombro</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={ombro}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setOmbro(text);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.labelImput}>Pescoço</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={pescoco}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setPescoco(text);
                }}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Anterior" onPress={handlePreviousStep} />
            <Button title="Próximo" onPress={handleNextStep} />
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Etapa 3</Text>

          <View style={styles.tableContainer}>
            {/* Cabeçalhos das colunas */}
            <View style={styles.row}>
              <Text style={styles.labelImput}> </Text>
              {/* Espaço vazio na legenda para o cabeçalho */}
              <Text style={styles.labelImput}>Esquerdo</Text>
              <Text style={styles.labelImput}>Direito</Text>
            </View>

            {/* Linhas de inputs com legenda */}
            <View style={styles.row}>
              <Text style={styles.labelImput}>Bíceps Relaxado</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={biceps_relaxado_esquerdo}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setBracoRelaxadoEsquerdo(text);
                }}
              />
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={biceps_relaxado_direito}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setBracoRelaxadoDireito(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Bíceps Contraido</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={biceps_contraido_esquerdo}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setBracoContraidoEsquerdo(text);
                }}
              />
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={biceps_contraido_direito}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setBracoContraidoDireito(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Antebraço</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={antebraco_esquerdo}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setAntebracoEsquerdo(text);
                }}
              />
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={antebraco_direito}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setAntebracoDireito(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Punho</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={punho_esquerdo}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setPunhoEsquerdo(text);
                }}
              />
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={punho_direito}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setPunhoDireito(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Coxa Proximal</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={coxa_proximal_esquerda}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setCoxaProximalEsquerda(text);
                }}
              />
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={coxa_proximal_direita}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setCoxaProximalDireita(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Coxa Medial</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={coxa_medial_esquerda}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setCoxaMedialEsquerda(text);
                }}
              />
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={coxa_medial_direita}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setCoxaMedialDireita(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Coxa Distal</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={coxa_distal_esquerda}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setCoxaDistalEsquerda(text);
                }}
              />
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={coxa_distal_direita}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setCoxaDistalDireita(text);
                }}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelImput}>Panturrilha</Text>
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={panturrilha_esquerda}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setPanturrilhaEsquerda(text);
                }}
              />
              <TextInput
                style={styles.inputColumn}
                placeholder=""
                value={panturrilha_direita}
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setPanturrilhaDireita(text);
                }}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Anterior" onPress={handlePreviousStep} />
            <Button title="Concluir" onPress={handleAddMeasurement} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  stepContainer: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    marginBottom: 20,
  },
  stepSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 25,
    marginTop: 15,
    textAlign: "center",
  },
  labelImput: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
  },
  divide: {
    backgroundColor: "#000",
    width: "100%",
    height: 1,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textColumn: {
    fontSize: 12,
    fontWeight: "500",
    color: "#444",
    marginBottom: 8,
    textAlign: "left",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  resultColumn: {
    flex: 1,
  },
  protocoloContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    width: "60%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  tableContainer: {
    flexDirection: "column",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelColumn: {
    flex: 1, // Ajusta o espaço da coluna de legenda
    fontSize: 10,
    textAlign: "center",
  },
  inputColumn: {
    flex: 1, // Ajusta o espaço das colunas de input
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 40,
    width: "100%",
  },
});

export default AddMeasurementScreen;
