import React, { useRef, useEffect, useState } from 'react';
import { Text, View, Platform, ActivityIndicator, TextInput, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'; 
import Animated from 'react-native-reanimated';
import styles from './styles';
import NetInfo from '@react-native-community/netinfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const staticImage = require("./assets/swBanner.png");

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

const DataList = ({ data, loading, showModal }) => {
  if (loading) {
    return <ActivityIndicator 
      style={styles.activityIndicator}/>;
  }

  const renderItem = ({ item, index }) => {
    const swipeableRef = useRef(null); 
    const handleSwipeAction = () => {
      showModal(item); 
      swipeableRef.current?.close(); 
    };
    return (
      <Swipeable
        key={item.name || item.title || index}
        ref={swipeableRef} 
        renderRightActions={() => (
          <Animated.View style={styles.swipeAction}/>
        )}
        onSwipeableRightOpen={handleSwipeAction} 
      >
        <View style={styles.listItem}>
          <Text>{item.name || item.title}</Text>
        </View>
      </Swipeable>
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {data.map((item, index) => renderItem({ item, index }))}
    </ScrollView>
  );
};

const PlanetDetail = ({ route }) => {
  const { planet } = route.params; 

  return (
    <ScrollView contentContainerStyle={styles.detailContainer}>
      <Text style={styles.detailTitle}>{planet.name}</Text>
      <Text>Population: {planet.population}</Text>
      <Text>Climate: {planet.climate}</Text>
      <Text>Terrain: {planet.terrain}</Text>
      <Text>Diameter: {planet.diameter}</Text>
      <Text>Gravity: {planet.gravity}</Text>
      <Text>Orbital Period: {planet.orbital_period}</Text>
      <Text>Rotation Period: {planet.rotation_period}</Text>
      <Text>Surface Water: {planet.surface_water}</Text>
    </ScrollView>
  );
};

const Planets = ({ navigation }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData('https://swapi.dev/api/planets/', setPlanets, setLoading);
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredPlanets(planets);
    } else {
      setFilteredPlanets(
        planets.filter((planet) =>
          planet.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredPlanets(planets); 
  }, [planets]);

  const showDetail = (planet) => {
    navigation.navigate("PlanetDetail", { planet });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={staticImage} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a planet"
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {filteredPlanets.map((item) => (
            <Swipeable
              key={item.name}
              renderRightActions={() => <View style={styles.swipeAction} />}
              onSwipeableRightOpen={() => showDetail(item)}
            >
              <View style={styles.listItem}>
                <Text>{item.name}</Text>
              </View>
            </Swipeable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData('https://swapi.dev/api/films/', setFilms, setLoading);
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredFilms(films); 
    } else {
      setFilteredFilms(
        films.filter((film) =>
          film.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredFilms(films);
  }, [films]);

  const showModal = (item) => {
    console.log("Item selected:", item.title);
    alert(`You selected: ${item.title}`);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={staticImage} />
      
      {/* Real-time search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a film"
        value={searchTerm}
        onChangeText={handleSearch} 
      />

      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {filteredFilms.map((item) => (
            <Swipeable
              key={item.title}
              renderRightActions={() => <View style={styles.swipeAction} />}
              onSwipeableRightOpen={() => showModal(item)}
            >
              <View style={styles.listItem}>
                <Text>{item.title}</Text>
              </View>
            </Swipeable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const Spaceships = () => {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredSpaceships, setFilteredSpaceships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData('https://swapi.dev/api/starships/', setSpaceships, setLoading);
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredSpaceships(spaceships); 
    } else {
      setFilteredSpaceships(
        spaceships.filter((spaceship) =>
          spaceship.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredSpaceships(spaceships);
  }, [spaceships]);

  const showModal = (item) => {
    console.log("Item selected:", item.name);
    alert(`You selected: ${item.name}`);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={staticImage} />      
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a spaceship"
        value={searchTerm}
        onChangeText={handleSearch} 
      />
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {filteredSpaceships.map((item) => (
            <Swipeable
              key={item.name}
              renderRightActions={() => <View style={styles.swipeAction} />}
              onSwipeableRightOpen={() => showModal(item)}
            >
              <View style={styles.listItem}>
                <Text>{item.name}</Text>
              </View>
            </Swipeable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};


const PlanetStack = createNativeStackNavigator();
const PlanetsStackScreen = () => (
  <PlanetStack.Navigator screenOptions={{ headerShown: false }}>
    <PlanetStack.Screen name="Planets" component={Planets} />
    <PlanetStack.Screen name="PlanetDetail" component={PlanetDetail} />
  </PlanetStack.Navigator>
);


const Tab = createBottomTabNavigator();
const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Films" component={Films} />
    <Tab.Screen name="Planets" component={Planets} />
    <Tab.Screen name="Spaceships" component={Spaceships} />
  </Tab.Navigator>
);


const Drawer = createDrawerNavigator();
const DrawerNavigation = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Films" component={Films} />
    <Drawer.Screen name="Planets" component={PlanetsStackScreen} />
    <Drawer.Screen name="Spaceships" component={Spaceships} />
  </Drawer.Navigator>
);
 
export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          "Network Error",
          "You are currently offline. Please check your internet connection."
        );
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      {Platform.OS === 'ios' ? <BottomTabs /> : <DrawerNavigation />}
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

