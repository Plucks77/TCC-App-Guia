import React, { useEffect, useState, useCallback } from "react";
import LottieView from "lottie-react-native";
import { AppLoading } from "expo";
import { FontAwesome } from "@expo/vector-icons";

import api from "../../services/api";
import getDate from "../../services/dayCalculator";
import { useAuth } from "../../contexts/auth";
import { useFocusEffect } from "@react-navigation/native";

import {
  Container,
  Data,
  Foto,
  Nome,
  PacoteContainer,
  Participantes,
  AdicionarPacoteContainer,
} from "./styles";

interface pacote {
  __meta__: { participantes: number };
  id: number;
  name: string;
  date: string;
  dias_restantes: number;
  image_url: string;
}

export function Main({ navigation }) {
  const { user_id } = useAuth();
  const [pacotes, setPacotes] = useState<pacote[]>([]);

  function fetchPacotes() {
    api.get(`/pacotes/guia/${user_id}`).then((res) => {
      const pacotes = getDate(res.data);
      setPacotes(pacotes);
    });
  }


  useFocusEffect(
    useCallback(() => {
      fetchPacotes();
    }, [])
  );

  return pacotes.length !== 0 ? (
    <Container>
      {pacotes.map((pacote) => (
        <PacoteContainer
          key={pacote.id}
          onPress={() => {
            pacote.dias_restantes === 0
              ? navigation.navigate("PacoteAtivo", { pacote: pacote })
              : navigation.navigate("EditarPacote", { pacote: pacote });
          }}
        >
          <Foto source={{ uri: pacote.image_url }} />
          <Nome>{pacote.name}</Nome>
          {pacote.dias_restantes === 0 ? (
            <Data>hoje!</Data>
          ) : pacote.dias_restantes !== 1 ? (
            <Data> daqui a {pacote.dias_restantes} dias!</Data>
          ) : (
            <Data> amanhã!</Data>
          )}
          {pacote.__meta__.participantes != 1 ? (
            <Participantes>{pacote.__meta__.participantes} participantes</Participantes>
          ) : (
            <Participantes>{pacote.__meta__.participantes} participante</Participantes>
          )}
        </PacoteContainer>
      ))}
      <AdicionarPacoteContainer onPress={() => navigation.navigate("AdicionarPacote")}>
        <FontAwesome name="plus" size={50} color="black" />
      </AdicionarPacoteContainer>
    </Container>
  ) : (
    <LottieView source={require("../../../assets/loading.json")} autoPlay loop />
    // <AppLoading />
  );
}

export default Main;
