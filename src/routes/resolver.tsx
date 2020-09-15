import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";

import { useAuth } from "../contexts/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { registerForPushNotificationsAsync } from "../services/notification_register";
import api from "../services/api";
import { Text } from "react-native";

const Routes: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { singned, loading, user_id } = useAuth();

  useEffect(() => {
    if (user_id) {
      setLoaded(true);
    }
  }, [user_id]);

  async function verify() {
    //Verifica se o guia já tem um token no banco
    try {
      await api.get(`/guia/verify/${user_id}`).then(async (res) => {
        //Se ele não tiver, é criado um token
        if (!res.data.verified) {
          const token = await registerForPushNotificationsAsync();
          //E enviado para o banco
          await api.post("/guia/verify-token", { id: user_id, token }).then((res) => {
            if (res.status !== 200) {
              console.log("Algum erro ocorreu durante a verificação do token do expo!");
            }
          });
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    if (loaded) {
      verify();
    }
  }, [loaded]);

  if (loading) {
    // return <AppLoading />;
    return <Text>Carregando...</Text>;
  }

  return singned ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
