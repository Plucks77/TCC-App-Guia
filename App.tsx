import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

import Routes from "./src/routes/resolver";
import { AuthProvider } from "./src/contexts/auth";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
