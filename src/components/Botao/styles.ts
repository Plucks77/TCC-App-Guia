import styled from "styled-components/native";
import { palette } from "../../styles/global";

interface props {
  primary: boolean;
}

export const BotaoCorpo = styled.TouchableOpacity`
  width: 300px;
  height: 35px;
  border-radius: 10px;
  background-color: ${(props: props) => (props.primary ? palette.primary : palette.white)};
  border: 1px solid ${palette.primary};
  align-items: center;
  justify-content: center;
`;

export const BotaoTexto = styled.Text`
  color: ${(props: props) => (props.primary ? palette.white : palette.secundary)};
  font-weight: bold;
`;
