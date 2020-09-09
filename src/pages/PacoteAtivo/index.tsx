import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Scanner from "../../components/Scanner";
import { Container, Foto, BotoesContainer, BotaoContainer, Icone } from "./styles";
import { palette } from "../../styles/global";
import Botao from "../../components/Botao";

interface pacote {
  __meta__: { participantes: number };
  id: number;
  name: string;
  date: string;
  dias_restantes: number;
  image_url: string;
}

export function PacoteAtivo({ navigation, route }) {
  const [scanning, setScanning] = useState(false);

  const pacote = route.params.pacote as pacote;
  navigation.setOptions({ title: pacote.name });

  return !scanning ? (
    <Container>
      <Foto source={{ uri: pacote.image_url }} />
      <BotoesContainer>
        <BotaoContainer>
          <Icone>
            <FontAwesome name="qrcode" size={24} color={palette.white} />
          </Icone>
          <Botao texto="Escanear QR Code" primary={true} props={() => setScanning(!scanning)} />
        </BotaoContainer>

        <BotaoContainer>
          <Icone>
            <FontAwesome name="group" size={24} color={palette.white} />
          </Icone>
          <Botao
            texto="Lista de participantes"
            primary={true}
            props={() => navigation.navigate("ListaParticipantes", { pacote_id: pacote.id })}
          />
        </BotaoContainer>

        <BotaoContainer>
          <Icone>
            <FontAwesome name="flag" size={24} color={palette.white} />
          </Icone>
          <Botao texto="Reunião" primary={true} props={null} />
        </BotaoContainer>
      </BotoesContainer>
    </Container>
  ) : (
    <Scanner />
  );
}

export default PacoteAtivo;
