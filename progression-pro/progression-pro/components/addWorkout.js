import { useState, useContext } from 'react';
import { 
  View, 
  StyleSheet,
} from 'react-native';
import { ListWorkoutMovimentsContext } from '../App';
import UITextInput from './UITextInput';
import UIButton from './UIButton';
import UIFormButtons from './UIFormButtons';
import { insertWorkout, insertWorkoutMovement } from '../database/database';

const AddWorkoutScreen = ({ navigation }) => {
  const { listWorkoutMoviments } = useContext(ListWorkoutMovimentsContext)
  const [ workoutTitle, setWorkoutTitle ] = useState('')

  const goToSelectMoviments = () => {
    navigation.navigate('SelectMoviments')
  }

  const goToBack = () => {
    navigation.navigate('Treinos')
  }

  const createWorkout = async () => {
    const newWorkout = await insertWorkout(1, workoutTitle)
    
    listWorkoutMoviments.map( async (moviment) => {
      await insertWorkoutMovement(
        newWorkout.id,
        moviment.movimentId,
        moviment.series,
        moviment.repetitions,
        moviment.timeBreak,
      )
    })
    goToBack()
  }

  return(
    <View style={styles.screen}>
      <View style={{ alignItems: 'center' }}>
        <View>
          <UITextInput
            placeholder={'Título do treino'}
            height={60}
            width={350}
            onChange={setWorkoutTitle}
          />
        </View>
        <View>
          <UIButton
            label={'Selecione os movimentos'}
            buttonColor={'blue'}
            labelColor={'white'}
            height={60}
            width={350}
            onPress={goToSelectMoviments}
          />
        </View>
      </View>

      <UIFormButtons
        submitLabel={'Finalizar'}
        height={60}
        width={170}
        functionCancel={goToBack}
        functionSubmit={createWorkout}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingTop: 50,
    justifyContent: 'space-between'
  },
  containerTextInput: {
    alignItems: 'center',
  },
  buttonsSection: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 10
  }
})

export default AddWorkoutScreen