import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    //Adding styles.text to Text
    <View style={styles.container}>
      <Text style={styles.text}>Hi, my name is Ben Alexander, and I am a mobile developer</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Bold Text Style
  text: {
    fontWeight: "bold", 
    },
});
