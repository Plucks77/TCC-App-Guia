import React from "react";
import { Text } from "react-native";

import { Container } from "./styles";

interface pacote {
  __meta__: { participantes: number };
  id: number;
  name: string;
  date: string;
  dias_restantes: number;
  image_url: string;
}

export function PacoteAtivo({ navigation, route }) {
  const pacote = route.params.pacote as pacote;
  navigation.setOptions({ title: pacote.name });

  return (
    <Container>
      <Text>Pacote ativo</Text>
    </Container>
  );
}

export default PacoteAtivo;
