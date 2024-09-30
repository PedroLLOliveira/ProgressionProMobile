import { useState, useContext } from 'react'
import { 
  View, 
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { ListWorkoutMovimentsContext } from '../App'; 
import UITextInput from './UITextInput';
import UIFormButtons from './UIFormButtons';

const UISelectMovimentsCard = ({ item }) => {
  const { listWorkoutMoviments, setListWorkoutMoviments } = useContext(ListWorkoutMovimentsContext)

  const [modalVisible, setModalVisible] = useState(false)
  const [movimentId, setMovimentId] = useState(item.id)
  const [series, setSeries] = useState()
  const [repetitions, setRepetitions] = useState()
  const [ timeBreak, setTimeBreak ] = useState()
  const [colorSelected, setColorSelected] = useState('#fff')

  const resetModal = () => {
    setSeries('')
    setRepetitions('')
    setTimeBreak('')
    setModalVisible(false)
  }

  const saveListWorkoutMoviments = () => {
    const data = {
      movimentId: movimentId,
      series: series,
      repetitions: repetitions,
      timeBreak: timeBreak
    }

    setListWorkoutMoviments((prev) => [...prev, data])
    setModalVisible(false)
    setColorSelected('green')
  }

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.title}>{item.nome}</Text>
            </View>
            <View style={styles.formSection}>
              <UITextInput
                placeholder={'Séries'}
                height={50}
                width={300}
                onChange={setSeries}
                type={'numeric'}
              />
              <UITextInput
                placeholder={'Repetições'}
                height={50}
                width={300}
                onChange={setRepetitions}
                type={'numeric'}
              />
              <UITextInput
                placeholder={'Pausas'}
                height={50}
                width={300}
                onChange={setTimeBreak}
                type={'numeric'}
              />

              <UIFormButtons
                height={50}
                width={140}
                functionCancel={resetModal}
                functionSubmit={saveListWorkoutMoviments}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable 
        style={[ styles.card, { backgroundColor: colorSelected } ]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.sectionTitles}>
          <View>
            <Text style={styles.subTitle}>{item.grupo}</Text>
          </View>
          <View>
            <Text style={styles.title}>{item.nome}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitles: {
    gap: 2
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2c3e50',
    maxWidth: 300
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    height: 400,
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  formSection: {
    marginTop: 30,
    alignContent: 'center',
  }
});

export default UISelectMovimentsCard