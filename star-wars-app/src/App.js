import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Fetching and List Components
const fetchData = async (url, setData, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get(url);
    setData(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};

const DataList = ({ data, loading }) => {
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text>{item.name || item.title}</Text>
        </View>
      )}
    />
  );
};

// Screens
const PlanetsScreen = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('https://swapi.dev/api/planets/', setPlanets, setLoading);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Planets</Text>
      <DataList data={planets} loading={loading} />
    </View>
  );
};

const FilmsScreen = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('https://swapi.dev/api/films/', setFilms, setLoading);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Films</Text>
      <DataList data={films} loading={loading} />
    </View>
  );
};

const SpaceshipsScreen = () => {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('https://swapi.dev/api/starships/', setSpaceships, setLoading);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Spaceships</Text>
      <DataList data={spaceships} loading={loading} />
    </View>
  );
};

// Tab Navigator (iOS)
const Tab = createBottomTabNavigator();
const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Planets" component={PlanetsScreen} />
    <Tab.Screen name="Films" component={FilmsScreen} />
    <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
  </Tab.Navigator>
);

// Drawer Navigator (Android)
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Planets" component={PlanetsScreen} />
    <Drawer.Screen name="Films" component={FilmsScreen} />
    <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
  </Drawer.Navigator>
);

// App Component
export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === 'ios' ? <BottomTabs /> : <DrawerNavigation />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});
