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

export function EditarPacote({ navigation, route }) {
  const pacote = route.params.pacote as pacote;
  navigation.setOptions({ title: pacote.name });

  return (
    <Container>
      <Text>Tela de edição</Text>
    </Container>
  );
}

export default EditarPacote;
