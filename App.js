import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/Login'
import Welcome from "./components/Welcome"
import Home from './components/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "LoginScreen",
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: "Welcome",
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}

        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
