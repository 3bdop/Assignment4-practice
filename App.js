//import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import Tabs from "./components/Tabs";
import Welcome from "./components/Welcome";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Stack = createNativeStackNavigator();
export default function App() {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
