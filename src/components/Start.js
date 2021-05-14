import React from "react";
import { StylingStartButton } from "./styles/StylingStart";

function StartButton({ callback }) {
  return <StylingStartButton onClick={callback}>Start Game</StylingStartButton>;
}

export default StartButton;
