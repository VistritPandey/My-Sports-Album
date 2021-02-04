import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import TeamScreen from "../screens/TeamScreen";

export default AuthStackScreens = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="TeamScreen" component={TeamScreen} />
    </AuthStack.Navigator>
  );
};
