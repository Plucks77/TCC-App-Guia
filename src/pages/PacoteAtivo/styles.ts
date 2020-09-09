import styled from "styled-components/native";
import { Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;

export const Container = styled.View`
  flex: 1;
`;

export const QRCodeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Foto = styled.Image`
  width: ${WIDTH}px;
  height: 150px;
  resize-mode: stretch;
`;

export const BotoesContainer = styled.View`
  margin-top: 70px;
  justify-content: center;
  align-items: center;
`;

export const BotaoContainer = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
`;

export const Icone = styled.View`
  position: absolute;
  z-index: 10;
  left: 20px;
`;
