import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, ActivityIndicator, TextInput, Modal, Button, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'; 
import Animated from 'react-native-reanimated';
import styles from './styles';
import NetInfo from '@react-native-community/netinfo';


// Assets
const staticImage = require("./assets/swBanner.png");

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

const DataList = ({ data, loading, showModal }) => {
  if (loading) {
    return <ActivityIndicator 
      style={styles.activityIndicator}/>;
  }

  // Function to render individual items with swipeable actions
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

// Remaining components (SearchAndModal, screens, etc.) remain unchanged
const SearchAndModal = ({onSearchSubmit}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (text) => {
    setSearchText(text);
    setModalVisible(true);
  };
  const handleSubmit = () => {
    onSearchSubmit(searchTerm);
    setModalVisible(true); // Show the modal with the search term
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter search term"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={(event) => handleSearchSubmit(event.nativeEvent.text)}
      />
      <Button 
        title="Submit" 
        onPress={handleSubmit}
        />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>You searched for: {searchTerm}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('https://swapi.dev/api/planets/', setPlanets, setLoading);
  }, []);

  const handleSearchSubmit = (searchTerm) => {
    console.log("Search submitted for:", searchTerm);
  };
  const showModal = (item) => {
    console.log("Item selected:", item.name || item.title);
    alert(`You selected: ${item.name || item.title}`); // Display the item name in an alert (modal).
  };
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={staticImage}
        />
      <SearchAndModal onSearchSubmit={handleSearchSubmit} showModal={showModal} />
      <DataList 
        data={planets} 
        loading={loading} 
        showModal={showModal} 
        />
    </View>
  );
};

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('https://swapi.dev/api/films/', setFilms, setLoading);
  }, []);

  const handleSearchSubmit = (searchTerm) => {
    console.log("Search submitted for:", searchTerm);
  };
  const showModal = (item) => {
    console.log("Item selected:", item.name || item.title);
    alert(`You selected: ${item.name || item.title}`); 
  };
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={staticImage}
        />     0
      <SearchAndModal 
        onSearchSubmit={handleSearchSubmit} 
        showModal={showModal} 
        />
      <DataList 
        data={films} 
        loading={loading} 
        showModal={showModal} />
    </View>
  );
};

const Spaceships = () => {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData('https://swapi.dev/api/starships/', setSpaceships, setLoading);
  }, []);

  const handleSearchSubmit = (searchTerm) => {
    console.log("Search submitted for:", searchTerm);
  };
  const showModal = (item) => {
    console.log("Item selected:", item.name);
    alert(`You selected: ${item.name}`);
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={staticImage}/>
      <SearchAndModal 
        onSearchSubmit={handleSearchSubmit} 
        showModal={showModal} 
        />
      <DataList 
        data={spaceships} 
        loading={loading} 
        showModal={showModal} 
        />
    </View>
  );
};

// Tab Navigator (iOS)
const Tab = createBottomTabNavigator();
const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Films" component={Films} />
    <Tab.Screen name="Planets" component={Planets} />
    <Tab.Screen name="Spaceships" component={Spaceships} />
  </Tab.Navigator>
);

// Drawer Navigator (Android)
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Films" component={Films} />
    <Drawer.Screen name="Planets" component={Planets} />
    <Drawer.Screen name="Spaceships" component={Spaceships} />
  </Drawer.Navigator>
);

// App Component
export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          "Network Error",
          "You are currently offline. Please check your internet connection."
        );
      }
    });

    // Cleanup the subscription on unmount
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

