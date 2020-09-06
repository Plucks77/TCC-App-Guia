import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { Formik } from "formik";
import LottieView from "lottie-react-native";
import * as yup from "yup";

import { useAuth } from "../../contexts/auth";
import Botao from "../../components/Botao";
import { palette } from "../../styles/global";

import {
  Container,
  Input,
  ViewInput,
  Texto,
  Erro,
  AreaInputs,
  Logo,
  LogoView,
  ViewBotao,
} from "./styles";

///^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const loginSchema = yup.object({
  email: yup
    .string()
    .required("O endereço de email é necessário!")
    .test("valida-email", "Por favor, digite um enderço de email válido!", (val) => {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(val);
    }),
  password: yup
    .string()
    .required("A senha é necessária!")
    .min(8, "Sua senha tem pelo menos 8 dígitos!"),
});

export default function Login({ navigation }) {
  const { signIn } = useAuth();

  const [ready, setReady] = useState(true);
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  async function login(email, password) {
    setReady(false);
    setUser({ email, password });
    const response = await signIn(email, password);

    if (response === "email") {
      setReady(true);
      Alert.alert("Oooops...", "Verifique se digitou o email correto!");
    }
    if (response === "password") {
      setReady(true);
      Alert.alert("Oooops...", "Senha incorreta!");
    }
  }

  return ready ? (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position">
          <LogoView>
            <Logo source={require("../../../assets/LOGO.png")} resizeMode="contain" />
          </LogoView>
          <Formik
            initialValues={{ email: user.email, password: user.password }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values.email, values.password);
            }}
          >
            {(props) => (
              <AreaInputs>
                <ViewInput>
                  <MaterialIcons
                    name="email"
                    size={25}
                    style={{
                      position: "absolute",
                      marginTop: 7,
                      paddingLeft: 6,
                    }}
                    color={palette.secundary}
                  />
                  <Input
                    placeholder="Email"
                    placeholderTextColor={palette.secundary}
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                    onBlur={props.handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    maxLength={50}
                  />
                  <Erro>{props.touched.email && props.errors.email}</Erro>
                </ViewInput>

                <ViewInput>
                  <MaterialIcons
                    name="lock"
                    size={25}
                    style={{
                      position: "absolute",
                      marginTop: 7,
                      paddingLeft: 6,
                    }}
                    color={palette.secundary}
                  />
                  <Input
                    placeholder="Senha"
                    placeholderTextColor={palette.secundary}
                    onChangeText={props.handleChange("password")}
                    value={props.values.password}
                    onBlur={props.handleBlur("password")}
                    secureTextEntry={showPassword ? false : true}
                    maxLength={50}
                  />
                  <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                    <Entypo
                      name={showPassword ? "eye-with-line" : "eye"}
                      size={25}
                      style={{
                        position: "absolute",
                        alignSelf: "flex-end",
                        marginTop: 7,
                        paddingRight: 6,
                      }}
                      color={palette.secundary}
                    />
                  </TouchableWithoutFeedback>
                  <Erro>{props.touched.password && props.errors.password}</Erro>
                </ViewInput>
                <ViewBotao>
                  <Botao texto="Entrar" props={props.handleSubmit} primary={true} />
                </ViewBotao>
                <TouchableOpacity onPress={() => navigation.navigate("Esqueci minha senha")}>
                  <Texto>Esqueci minha senha</Texto>
                </TouchableOpacity>
              </AreaInputs>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  ) : (
    <LottieView source={require("../../../assets/loading.json")} autoPlay loop />
  );
}
