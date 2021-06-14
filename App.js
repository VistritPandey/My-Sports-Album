import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import AppStackScreens from "./src/stacks/AppStackScreens";
import { FirebaseProvider } from "./src/context/FirebaseContext";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreens />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  );
};
