import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import Botao from "../../components/Botao";
import { palette } from "../../styles/global";
import {
  Container,
  BotaoContainer,
  InputsContainer,
  Input,
  InputLabel,
  InputArea,
  InputDataArea,
  Data,
  PickerContainer,
} from "./styles";

interface pacote {
  __meta__: { participantes: number };
  id: number;
  description: string;
  name: string;
  date: string;
  dias_restantes: number;
  image_url: string;
  category_id: string;
  local_id: string;
  price: string;
  dia: string;
  hora: string;
}

export function EditarPacote({ navigation, route }) {
  const [pacote, setPacote] = useState<pacote>({} as pacote);
  const [ready, setReady] = useState(false);
  navigation.setOptions({ title: pacote.name });

  useEffect(() => {
    const pacote = route.params.pacote as pacote;
    const diaHora = pacote.date.split("T");
    const dia = diaHora[0].split("-");
    const hora = diaHora[1];
    pacote.hora = hora;
    pacote.dia = dia[2] + "/" + dia[1];
    setPacote(pacote);
    setReady(true);
  }, []);

  return ready ? (
    <Container>
      <InputsContainer>
        <InputArea>
          <InputLabel>Nome:</InputLabel>
          <Input placeholder="Título" value={pacote.name} />
        </InputArea>

        <InputArea>
          <InputLabel>Descrição:</InputLabel>
          <Input placeholder="Descrição" value={pacote.description} />
        </InputArea>

        <InputArea>
          <InputLabel>Data e hora:</InputLabel>
          <InputDataArea>
            <Data value={pacote.dia} />
            <Text> hás </Text>
            <Data value={pacote.hora} />
          </InputDataArea>
          {/* <Input placeholder="Data" value={pacote.dia + " hás " + pacote.hora} /> */}
        </InputArea>

        <InputArea>
          <InputLabel>Preço:</InputLabel>
          <Input placeholder="Preço" value={"R$ " + pacote.price} />
        </InputArea>

        <InputArea>
          <InputLabel>Categoria:</InputLabel>
          <PickerContainer>
            <RNPickerSelect
              placeholder={{ label: "Selecione uma categoria", value: null }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "Football", value: "football" },
                { label: "Baseball", value: "baseball" },
                { label: "Hockey", value: "hockey" },
              ]}
            />
          </PickerContainer>
        </InputArea>

        <InputArea>
          <InputLabel>Local:</InputLabel>
          <PickerContainer>
            <RNPickerSelect
              placeholder={{ label: "Selecione um local", value: null }}
              useNativeAndroidPickerStyle={true}
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "Football", value: "football" },
                { label: "Baseball", value: "baseball" },
                { label: "Hockey", value: "hockey" },
              ]}
            />
          </PickerContainer>
        </InputArea>
      </InputsContainer>
      <BotaoContainer>
        <Botao primary={true} texto="Salvar" props={() => {}} />
      </BotaoContainer>
    </Container>
  ) : (
    <Text>Carregando...</Text>
  );
}

export default EditarPacote;
