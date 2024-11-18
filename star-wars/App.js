import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Planets from "./Planets";
import Spaceships from "./Spaceships";
import Films from "./Films";

export default function App() {
  return (
    <NavigationContainer>
    {Platform.OS === "ios" && (
      <Tab.Navigator>
        <Tab.Screen name="Planets" component={Planets} />
        <Tab.Screen name="Spaceships" component={Spaceships} />
        <Tab.Screen name="Films" component={Films} />
      </Tab.Navigator>
    )}

    {Platform.OS == "android" && (
      <Drawer.Navigator>
        <Drawer.Screen name="Planets" component={Planets} />
        <Drawer.Screen name="Spaceships" component={Spaceships} />
        <Drawer.Screen name="Films" component={Films} />
      </Drawer.Navigator>
    )}
  </NavigationContainer>
);
}


