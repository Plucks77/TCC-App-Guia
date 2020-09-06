import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";

import { palette } from "../styles/global";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerTintColor: palette.secundary,
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
    }}
  >
    <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
