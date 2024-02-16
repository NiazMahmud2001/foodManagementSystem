import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './screens/auth/Register';
import Login from './screens/auth/Login' ;
import LoginPhone from './screens/auth/LoginPhone'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loader_1 from "./screens/loader/loader_1"

export default function App() {
  const stack = createNativeStackNavigator()
  return (
    /*
    <NavigationContainer>
      <stack.Navigator initialRouteName='Login'>
          <stack.Screen 
            name='Register' 
            component={Register} 
            options={{headerShown:false}}
          />
          <stack.Screen
            name="Login" 
            component={Login} 
            options={{headerShown:false}}
          />
          <stack.Screen 
            name="LoginPhone"
            component={LoginPhone}
            options={{headerShown:false}}
          />
      </stack.Navigator>
    </NavigationContainer>
    */
  <loader_1/>
  );
}

