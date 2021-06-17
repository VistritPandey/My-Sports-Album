import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import cardsScreen from "../screens/cardsScreen";
import MessageScreen from "../screens/MessageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import videoScreen from "../screens/videoScreen";
import ProfileScreen from "../screens/ProfileScreen";
import icons from "../components/icons";
import { Image } from "react-native";

export default MainStackScreens = () => {
  const MainStack = createBottomTabNavigator();

  const tabBarOptions = {
    showLabel: false,
    style: {
      backgroundColor: "#002D72",
      paddingBottom: 12,
    },
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = "ios-home";

      switch (route.name) {
        case "Home":
          iconName = icons.baseball;
          break;
        case "Message":
          iconName = icons.message;
          break;
        case "Notification":
          iconName = icons.mlb;
          break;
        case "Profile":
          iconName = icons.settings;
          break;
      }
      return (
        <Image
          source={iconName}
          style={{
            tintColor: focused ? "grey" : "#fff",
            width: 28,
            height: 28,
          }}
        />
      );
    },
  });

  return (
    <MainStack.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="card" component={cardsScreen} />
      <MainStack.Screen name="Message" component={MessageScreen} />
      <MainStack.Screen name="Notification" component={NotificationScreen} />
      <MainStack.Screen name="video" component={videoScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator> //Test
  );
};
