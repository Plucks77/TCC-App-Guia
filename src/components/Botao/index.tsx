import React from "react";

import { BotaoCorpo, BotaoTexto } from "./styles";

export default function Botao({ texto, props, primary }) {
  return (
    <BotaoCorpo primary={primary} onPress={props}>
      <BotaoTexto primary={primary}>{texto}</BotaoTexto>
    </BotaoCorpo>
  );
}
