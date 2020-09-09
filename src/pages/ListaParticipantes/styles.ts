import styled from "styled-components/native";
import { palette } from "../../styles/global";
export const Container = styled.View`
  flex: 1;
`;

export const Titulo = styled.Text`
  margin-top: 20px;
  text-align: center;
  font-size: 22px;
  color: ${palette.secundary};
`;

export const ScrollParticipantes = styled.ScrollView.attrs(() => ({
  flex: 1,
  marginTop: 30,
}))``;

export const ParticipanteContainer = styled.View`
  width: 340px;
  height: 50px;
  border: 1px solid ${palette.secundary};
  border-radius: 5px;
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
`;

export const ParticipanteNome = styled.Text`
  font-size: 16px;
  color: ${palette.secundary};
  margin-left: 20px;
`;

export const Icone = styled.View`
  margin-left: 10px;
`;
