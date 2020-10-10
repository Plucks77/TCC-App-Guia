import React, { useState, useEffect } from "react";
import { Text, View, Image, Dimensions, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";

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
  const [newCapa, setNewCapa] = useState(null)
  const [oldCapa, setOldCapa] = useState(null)
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

   
    if (newCapa) {
      //Exclusão da capa anterior   
      const alteredConfig = {
        data: {
           url: oldCapa
        }       
      };
      console.log("Excluindo")
      console.log(alteredConfig);
      api.delete("/delete/foto", alteredConfig).catch(err => {
         console.log(err.message)
       });

      //Envio da nova capa
         let formData = new FormData();
    formData.append("image", {
      uri: newCapa.uri,
      type: "image/jpg", // or photo.type
      name: "Teste.jpg",
    } as any);
      console.log("Enviando")
      api.post("/envia/foto/Pacotes", formData).then(res => {
        const newUrl = res.data.url;
        pacoteEnviado.image_url = newUrl;
           api.put(`/pacote/edit/${pacote.id}`, pacoteEnviado).then((res) => {
      navigation.goBack();
    });
       })
    }        
    else {
      api.put(`/pacote/edit/${pacote.id}`, pacoteEnviado).then((res) => {
      navigation.goBack();
    });
    }    
    
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    // console.log(result);

    if (result.cancelled === false) {
      setNewCapa(result);
      setOldCapa(pacote.image_url);
      setPacote({ ...pacote, image_url: result.uri });
    }
  };

  return ready ? (
    <Container>
      <InputsContainer>
        <Image
          source={{ uri: pacote.image_url }}
          style={{
            width: WIDTH - 20,
            height: 200,
            resizeMode: "stretch",
            borderRadius: 5,
            marginBottom: 10,
          }}
        />
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
