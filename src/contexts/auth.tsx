import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../services/api";
import * as auth from "../services/auth";

interface AuthContextData {
  singned: boolean;
  user_id: Response | string | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<ResponseSignIn | string>;
  signOut(): void;
}

interface ResponseSignIn {
  token: string;
  user_id: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user_id, setUserId] = useState<Response | string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storaged_user_id = await AsyncStorage.getItem("@ValetourGuia:user_id");
      const sotraged_token = await AsyncStorage.getItem("@ValetourGuia:token");
      if (storaged_user_id && sotraged_token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(sotraged_token)}`;
        setUserId(storaged_user_id);
        setLoading(false);
      }
    }
    loadStoragedData();
  }, []);

  async function signIn(email: string, password: string) {
    const response = await auth.signIn(email, password);
    if (typeof response !== "string") {
      setUserId(response.user_id);

      api.defaults.headers.Authorization = `Bearer ${response.token}`;

      await AsyncStorage.setItem("@ValetourGuia:user_id", JSON.stringify(response.user_id));
      await AsyncStorage.setItem("@ValetourGuia:token", JSON.stringify(response.token));
    }

    return response;
  }

  async function signOut() {
    setUserId(null);
    await AsyncStorage.removeItem("@ValetourGuia:token");
    await AsyncStorage.removeItem("@ValetourGuia:token");
  }

  return (
    <AuthContext.Provider value={{ singned: !!user_id, user_id, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
