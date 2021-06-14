import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {UserProvider} from './src/context/UserContext'
import AppStackScreens from './src/stacks/AppStackScreens'
import { FirebaseProvider } from './src/context/FirebaseContext'
import cardsScreen from "./src/screens/cardsScreen";
import { createStackNavigator } from '@react-navigation/stack';

export default App = () => {

 

  
  return (
    <FirebaseProvider>
      <UserProvider>
      <NavigationContainer>
      
        
       
    
        <AppStackScreens />
      </NavigationContainer>
    </UserProvider>
    </FirebaseProvider>
  )
}