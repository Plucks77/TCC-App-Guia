import styled from "styled-components/native";
import { palette } from "../../styles/global";

export const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;

  background-color: ${palette.white};
`;

export const LogoView = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 50px;
`;

export const Logo = styled.Image`
  width: 200px;
  height: 200px;
`;

export const AreaInputs = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ViewInput = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Input = styled.TextInput`
  width: 310px;
  height: 40px;
  border: 2px;
  border-color: ${palette.secundary};
  color: ${palette.secundary};
  font-size: 20px;
  padding-left: 35px;
  border-radius: 10px;
`;

export const Erro = styled.Text`
  font-weight: bold;
  color: ${palette.error};
  text-align: center;
  margin-top: 5px;
`;

export const Texto = styled.Text`
  color: ${palette.secundary};
  font-weight: normal;
  margin-top: 15px;
`;

export const ViewBotao = styled.View`
  margin-bottom: 10px;
`;
