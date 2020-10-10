import React, { useState, useEffect } from "react";
import { Text, View, Platform, Button, Image, Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { useAuth } from "../../contexts/auth";
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
const WIDTH = Dimensions.get("window").width;

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
  const [image, setImage] = useState(null);
  const { user_id } = useAuth();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    // console.log(result);

    if (result.cancelled === false) {
      setImage(result);
    }
  };

  async function handleSave() {
    const dia = pacote.dia.split("/");
    const ano = new Date().getFullYear();
    const diaHora = ano + "-" + dia[1] + "-" + dia[0] + "T" + pacote.hora;
    const pacoteEnviado = pacote;
    pacoteEnviado.date = diaHora;
    let formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      type: "image/jpg", // or photo.type
      name: uuidv4().replaceAll("-", "") + ".jpg",
    } as any);
    formData.append("category_id", pacote.category_id);
    formData.append("guia_id", user_id.toString());
    formData.append("local_id", pacote.local_id);
    formData.append("name", pacote.name);
    formData.append("description", pacote.description);
    formData.append("price", pacote.price);
    formData.append("date", diaHora);

    api
      .post("/pacote/create", formData)
      .then((res) => {
        // console.log("Aqui");
        // console.log(res.data);
        navigation.goBack();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return ready ? (
    <Container>
      <InputsContainer>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: WIDTH - 20, height: 200, resizeMode: "stretch", borderRadius: 5 }}
          />
        )}

        <Button title="Selecione a capa" onPress={pickImage} />
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
        <BotaoContainer>
          <Botao primary={true} texto="Salvar" props={() => handleSave()} />
        </BotaoContainer>
      </InputsContainer>
    </Container>
  ) : (
    <Text>Carregando...</Text>
  );
}

export default AdicionarPacote;
