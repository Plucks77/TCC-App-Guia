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
  const [categorias, setCategorias] = useState([]);
  const [locals, setLocals] = useState([]);
  navigation.setOptions({ title: pacote.name });

  useEffect(() => {
    const pacote = route.params.pacote as pacote;
    const diaHora = pacote.date.split("T");
    const dia = diaHora[0].split("-");
    const hora = diaHora[1];
    pacote.hora = hora;
    pacote.dia = dia[2] + "/" + dia[1];
    setPacote(pacote);
  }, []);

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
              onChangeText={(value) => setPacote({ ...pacote, dia: value })}
              value={pacote.dia}
            />
            <Text> hás </Text>
            <Data
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
            value={pacote.price}
            keyboardType="numeric"
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

export default EditarPacote;
