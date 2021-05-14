import React from "react";
import { DisplayStyling } from "./styles/DisplayStyling";

function Display({ gameOver, text }) {
  return <DisplayStyling gameOver={gameOver}>{text}</DisplayStyling>;
}

export default Display;
