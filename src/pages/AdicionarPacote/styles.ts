import styled from "styled-components/native";
import { palette } from "../../styles/global";

export const Container = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: "padding",
}))`
  flex: 1;
  z-index: 1;
`;

export const InputsContainer = styled.ScrollView.attrs(() => ({
  alignItems: "center",
  contentContainerStyle: {
    paddingBottom: 50,
  },
}))`
  padding-top: 10px;
`;

export const InputArea = styled.View`
  margin-bottom: 10px;
`;

export const InputLabel = styled.Text`
  font-size: 20px;
  color: ${palette.secundary};
  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  width: 310px;
  height: 40px;
  border: 2px;
  border-color: ${palette.secundary};
  color: ${palette.secundary};
  font-size: 20px;
  padding-left: 20px;
  border-radius: 10px;
`;

export const InputDataArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Data = styled.TextInput`
  width: 100px;
  height: 40px;
  border: 2px;
  border-color: ${palette.secundary};
  color: ${palette.secundary};
  font-size: 20px;
  padding-left: 20px;
  border-radius: 10px;
`;

export const BotaoContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const PickerContainer = styled.View`
  width: 310px;
  height: 40px;
  border: 2px;
  border-color: ${palette.secundary};
  color: ${palette.secundary};
  font-size: 20px;
  padding-left: 20px;
  border-radius: 10px;
  justify-content: center;
`;
