import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './screens/auth/Register';
import Login from './screens/auth/Login' ; 
import LoginPhone from './screens/auth/LoginPhone'
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodMap from "./screens/foodBankMap/FoodMap"
import CamScan from './screens/scanFood/scanFoodByCamera/CamScan';
import EnterFoodManually from "./screens/scanFood/enterFoodManually/EnterFoodManually";
import EnterFoodWithBarCode from "./screens/scanFood/enterFoodManually/EnterFoodWithBarCode";
import EditFoodInfo from "./screens/EditFoodInfo/EditFoodInfo";
import Loader1 from './screens/loader/Loader1';
import VolInterface from "./screens/VolMainInterface/VolInterface"
import EmailVerification from "./screens/emailVerification/EmailVerification"
import UserProfile from "./screens/userProfile/UserProfile"

import MainInterface from "./screens/userInterface/MainInterface" ;
import { EntryExitTransition } from 'react-native-reanimated';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function App() {
  //setup notification permission: ===============================>>>> 
  async function registerForPushNotificationsAsync() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to receive push notifications was denied!');
        }
  };
  registerForPushNotificationsAsync();


  const stack = createNativeStackNavigator()
  return (
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
            <stack.Screen
              name="MainInterface"
              component={MainInterface}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="FoodMap"
              component={FoodMap}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="CamScan"
              component={CamScan}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="EnterFoodManually"
              component={EnterFoodManually}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="EnterFoodWithBarCode"
              component={EnterFoodWithBarCode}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="EditFoodInfo"
              component={EditFoodInfo}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="Loader1"
              component={Loader1}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="VolInterface"
              component={VolInterface}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="EmailVerification"
              component={EmailVerification}
              options={{headerShown:false}}
            />
            <stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{headerShown:false}}
            />
      </stack.Navigator>
    </NavigationContainer>
  );
}

