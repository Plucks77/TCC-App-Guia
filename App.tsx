import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";

import Routes from "./src/routes/resolver";
import { AuthProvider } from "./src/contexts/auth";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App: React.FC = () => {
  useEffect(() => {
    Notifications.addNotificationReceivedListener(_handleNotification);
    Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
  }, []);

  function _handleNotification(notification) {
    // console.log(notification.request.content.data.body);
  }

  function _handleNotificationResponse(response) {
    console.log("Aqui")
    // console.log(response.notification.request.content.data.x)
    // return;
    const x = response.notification.request.content.data.x;
    const y = response.notification.request.content.data.y;
    // console.log(x, y);
    if (Platform.OS === "android") {
      Linking.openURL(`http://maps.google.com/maps?daddr=${x},${y}`).catch((err) =>
        console.error("An error occurred", err)
      );
    } else {
      Linking.openURL(`maps://maps.apple.com/?q=${x},${y}`);
    }
  }

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
