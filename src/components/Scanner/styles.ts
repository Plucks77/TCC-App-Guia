import styled from "styled-components/native";
import { palette } from "../../styles/global";

export const Container = styled.View``;

export const BotaoCorpo = styled.TouchableOpacity`
  width: 100%;
  height: 35px;
  background-color: ${palette.primary};
  border: 1px solid ${palette.primary};
  align-items: center;
  justify-content: center;
`;

export const BotaoTexto = styled.Text`
  color: ${palette.white};
  font-weight: bold;
`;
