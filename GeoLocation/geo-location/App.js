import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";

const API_KEY = "AIzaSyAsdjma23qUVL3qmnxUHOcJFAiBzqcNWYc"; 
const PLACES_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}&radius=5000&type=restaurant&location=`;
export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    function setPosition({ coords: { latitude, longitude } }) {
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      fetch(`${PLACES_URL}${latitude},${longitude}`)
        .then((response) => response.json())
        .then(({ results, status }) => {
          console.log("API Response:", results, "Status:", status); 
          
          if (status === "OK" && results.length > 0) {
            setRestaurants(results); 
          } else {
            console.log("No nearby restaurants found or API returned error");
            setRestaurants([]); 
          }
        })
        .catch((error) => {
          console.log("Places API Error: ", error.message);
        });
    }

    let watcher;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition(location);

      watcher = await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.Highest },
        setPosition
      );
    })();

    return () => {
      watcher?.remove();
    };
  }, []);

  const renderRestaurantItem = ({ item }) => (
    <View style={styles.restaurantItem}>
      <Text style={styles.restaurantName}>{item.name}</Text>
      <Text style={styles.restaurantAddress}>{item.vicinity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Restaurants Near Me</Text>

      {region && (
        <MapView
          style={styles.mapView}
          showsUserLocation
          followUserLocation
          initialRegion={region} 
        >
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
              title={restaurant.name}
              description={restaurant.vicinity}
            />
          ))}
        </MapView>
      )}

      {restaurants.length > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.restaurantList}
        />
      ) : (
        <Text>No nearby restaurants found</Text>
      )}
    </View>
  );
}

