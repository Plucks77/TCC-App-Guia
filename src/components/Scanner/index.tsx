import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import api from "../../services/api";

import { Container, BotaoCorpo, BotaoTexto } from "./styles";

export function Scanner({ setScanning, pacote_id }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    api
      .post(`https://tcc-backend-turismo.herokuapp.com/purchase/confirm/user`, {
        user_id: data,
        pacote_id,
      })
      .then((res) => {
        if (res.data) {
          setScanned(true);
          setScanning(false);
        } else {
          alert("Ocorreu algum erro");
        }
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        zIndex: 15,
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      <BotaoCorpo onPress={() => setScanning(false)}>
        <BotaoTexto>Fechar</BotaoTexto>
      </BotaoCorpo>
    </View>
  );
}

export default Scanner;
