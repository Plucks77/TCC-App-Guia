import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import Main from "../pages/Main";
import PacoteAtivo from "../pages/PacoteAtivo";
import EditarPacote from "../pages/EditarPacote";
import AdicionarPacote from "../pages/AdicionarPacote";
import ListaParticipantes from "../pages/ListaParticipantes";

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
          title: "Meus pacotes",
        }}
      />
      <AppStack.Screen
        name="PacoteAtivo"
        component={PacoteAtivo}
        options={{
          title: "",
        }}
      />
      <AppStack.Screen
        name="EditarPacote"
        component={EditarPacote}
        options={{
          title: "",
        }}
      />
      <AppStack.Screen
        name="ListaParticipantes"
        component={ListaParticipantes}
        options={{
          title: "Lista de participantes",
        }}
      />
      <AppStack.Screen
        name="AdicionarPacote"
        component={AdicionarPacote}
        options={{
          title: "Criar pacote",
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
