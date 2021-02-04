import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TeamScreen from "../screens/TeamScreen";
import HomeScreen from "../screens/HomeScreen";
import MessageScreen from "../screens/MessageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default MainStackScreens = () => {
  const MainStack = createBottomTabNavigator();

  const tabBarOptions = {
    showLabel: false,
    style: {
      backgroundColor: "#c30000",
      paddingBottom: 12,
    },
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = "ios-home";

      switch (route.name) {
        case "Home":
          iconName = "ios-home";
          break;
        case "Message":
          iconName = "ios-chatboxes";
          break;
        case "Notification":
          iconName = "ios-notifications";
          break;
        case "Profile":
          iconName = "ios-person";
          break;
        default:
          iconName = "ios-home";
      }
      return (
        <Ionicons name={iconName} size={24} color={focused ? "#000" : "#fff"} />
      );
    },
  });

  return (
    <MainStack.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Message" component={MessageScreen} />
      <MainStack.Screen name="Notification" component={NotificationScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};
