import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  Ionicons,
} from "react-native-vector-icons";
import Register from "./Register";
import Pass from "./Pass";
import Fail from "./Fail";
const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "blue" }}
    >
      <Tab.Screen
        name="Home"
        component={Register}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="cash-register" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Pass"
        component={Pass}
        options={{
          tabBarLabel: "Pass",
          tabBarIcon: () => <Ionicons name="happy" size={20} />,
        }}
        // initialParams={{ name: "Students" }}
      />
      <Tab.Screen
        name="Fail"
        component={Fail}
        options={{
          tabBarLabel: "Fail",
          tabBarIcon: () => <FontAwesome5 name="sad-cry" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
