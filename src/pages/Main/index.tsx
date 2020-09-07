import React, { useEffect, useState } from "react";

import api from "../../services/api";
import getDate from "../../services/dayCalculator";
import { useAuth } from "../../contexts/auth";

import { Container, Data, Foto, Nome, PacoteContainer, Participantes } from "./styles";

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

  useEffect(() => {
    api.get(`/pacotes/guia/${user_id}`).then((res) => {
      const pacotes = getDate(res.data);
      setPacotes(pacotes);
    });
  }, []);

  return (
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
    </Container>
  );
}

export default Main;
