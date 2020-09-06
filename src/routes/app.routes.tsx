import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import Main from "../pages/Main";

import { palette } from "../styles/global";

const AppStack = createStackNavigator();
const AppBottomTab = createBottomTabNavigator();

const routes: React.FC = () => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen name="Main" component={BottomTab} />
  </AppStack.Navigator>
);

function PrincipalStack() {
  return (
    <AppStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTintColor: palette.secundary,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <AppStack.Screen
        name="Main"
        component={Main}
        options={{
          title: "Home",
        }}
      />
    </AppStack.Navigator>
  );
}

function BottomTab() {
  return (
    <AppBottomTab.Navigator
      tabBarOptions={{
        activeTintColor: palette.secundary,
        keyboardHidesTabBar: true,
        showLabel: false,
      }}
    >
      <AppBottomTab.Screen
        name="Viagens"
        component={PrincipalStack}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
        }}
      />
    </AppBottomTab.Navigator>
  );
}

export default routes;
