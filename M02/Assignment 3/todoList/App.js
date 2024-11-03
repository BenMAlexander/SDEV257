import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/tasks'

export default function App() {
  return (
    <View style={styles.container}>
    
      {/* Today's Tasks*/}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectoinTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {/* This is where the tasks will go */}
          <Task text={'Task 1'}/>
          <Task text={'Task 2'}/>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
taskWrapper: {
  paddingTop: 80,
  paddingHorizontal: 20,
},
sectoinTitle: {
  fontSize: 24,
  fontWeight: 'bold',
},
items: {
  margin: 30,
},
});
