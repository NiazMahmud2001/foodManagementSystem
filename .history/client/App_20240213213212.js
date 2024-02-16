import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './screens/auth/Register';
import Login from './screens/auth/Login' ;
import LoginPhone from './screens/auth/LoginPhone'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loader from "./screens/loader/loader"

export default function App() {
  const stack = createNativeStackNavigator()
  return (
    
    <loader/>
  );
}

