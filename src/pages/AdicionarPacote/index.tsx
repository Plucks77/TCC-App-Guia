import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import Botao from "../../components/Botao";
import api from "../../services/api";
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
  id: number | null;
  description: string;
  name: string;
  date: string;
  dias_restantes: number | null;
  image_url: string;
  category_id: string;
  local_id: string;
  price: string;
  dia: string;
  hora: string;
}

export function AdicionarPacote({ navigation }) {
  const [pacote, setPacote] = useState<pacote>({
    id: null,
    description: "",
    name: "",
    date: "",
    dias_restantes: null,
    image_url: "",
    category_id: "",
    local_id: "",
    price: "",
    dia: "",
    hora: "",
  });
  const [ready, setReady] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [locals, setLocals] = useState([]);

  function fetchCategorias() {
    api
      .get("/category/list")
      .then((res) => {
        let categoryValues = [];
        res.data.map((categoria) => {
          const item = {
            label: categoria.name,
            value: categoria.id,
          };
          categoryValues.push(item);
        });
        setCategorias(categoryValues);
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  }

  function fetchLocals() {
    api
      .get("/locals")
      .then((res) => {
        let localValues = [];
        res.data.map((local) => {
          const item = {
            label: local.name,
            value: local.id,
          };
          localValues.push(item);
        });
        setLocals(localValues);
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  }

  useEffect(() => {
    fetchCategorias();
    fetchLocals();
    setReady(true);
  }, []);

  async function handleSave() {
    const dia = pacote.dia.split("/");
    const ano = pacote.date.split("-");
    const diaHora = ano[0] + "-" + dia[1] + "-" + dia[0] + "T" + pacote.hora;
    const pacoteEnviado = pacote;
    pacoteEnviado.date = diaHora;
    // console.log(pacoteEnviado);
    // return;
    api.put(`/pacote/edit/${pacote.id}`, pacoteEnviado).then((res) => {
      navigation.goBack();
    });
  }

  return ready ? (
    <Container>
      <InputsContainer>
        <InputArea>
          <InputLabel>Nome:</InputLabel>
          <Input
            onChangeText={(value) => setPacote({ ...pacote, name: value })}
            placeholder="Título"
            value={pacote.name}
          />
        </InputArea>

        <InputArea>
          <InputLabel>Descrição:</InputLabel>
          <Input
            onChangeText={(value) => setPacote({ ...pacote, description: value })}
            placeholder="Descrição"
            value={pacote.description}
          />
        </InputArea>

        <InputArea>
          <InputLabel>Data e hora:</InputLabel>
          <InputDataArea>
            <Data
              placeholder="D/M"
              onChangeText={(value) => setPacote({ ...pacote, dia: value })}
              value={pacote.dia}
            />
            <Text> hás </Text>
            <Data
              placeholder="H:M"
              onChangeText={(value) => setPacote({ ...pacote, hora: value })}
              value={pacote.hora}
            />
          </InputDataArea>
        </InputArea>

        <InputArea>
          <InputLabel>Preço:</InputLabel>
          <Input
            onChangeText={(value) => setPacote({ ...pacote, price: value })}
            placeholder="Preço"
            keyboardType="numeric"
            value={pacote.price}
          />
        </InputArea>

        <InputArea>
          <InputLabel>Categoria:</InputLabel>
          <PickerContainer>
            <RNPickerSelect
              placeholder={{ label: "Selecione uma categoria", value: null }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => setPacote({ ...pacote, category_id: value })}
              items={categorias}
              value={pacote.category_id}
            />
          </PickerContainer>
        </InputArea>

        <InputArea>
          <InputLabel>Local:</InputLabel>
          <PickerContainer>
            <RNPickerSelect
              placeholder={{ label: "Selecione um local", value: null }}
              useNativeAndroidPickerStyle={true}
              onValueChange={(value) => setPacote({ ...pacote, local_id: value })}
              items={locals}
              value={pacote.local_id}
            />
          </PickerContainer>
        </InputArea>
      </InputsContainer>
      <BotaoContainer>
        <Botao primary={true} texto="Salvar" props={() => handleSave()} />
      </BotaoContainer>
    </Container>
  ) : (
    <Text>Carregando...</Text>
  );
}

export default AdicionarPacote;
