import React, { useState, useEffect } from "react";

import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";

import api from "../../services/api";
import { palette } from "../../styles/global";

import {
  Container,
  Titulo,
  ScrollParticipantes,
  ParticipanteContainer,
  ParticipanteNome,
  Icone,
} from "./styles";

interface Participantes {
  username: string;
  confirmed: boolean;
}

function ListaParticipantes({ navigation, route }) {
  const [participantes, setParticipantes] = useState<Participantes[]>([]);
  const [confirmados, setConfirmados] = useState(0);
  const [ready, setReady] = useState(false);
  const pacote_id = route.params.pacote_id;

  useEffect(() => {
    api.get(`/purchase/list/${pacote_id}`).then((res) => {
      setParticipantes(res.data);
    });
  }, []);

  useEffect(() => {
    if (participantes) {
      const confirmados = participantes.filter((p) => p.confirmed).length;
      setConfirmados(confirmados);
      setReady(true);
    }
  }, [participantes]);

  return ready ? (
    <Container>
      <Titulo>
        Participantes confirmados: {confirmados} de {participantes.length}
      </Titulo>
      <ScrollParticipantes>
        {participantes.map((participante, i) => (
          <ParticipanteContainer key={i}>
            <Icone>
              <FontAwesome
                name={participante.confirmed ? "check-circle-o" : "circle-o"}
                size={30}
                color={palette.secundary}
              />
            </Icone>
            <ParticipanteNome>{participante.username}</ParticipanteNome>
          </ParticipanteContainer>
        ))}
      </ScrollParticipantes>
    </Container>
  ) : (
    <LottieView source={require("../../../assets/loading.json")} autoPlay loop />
  );
}

export default ListaParticipantes;
