import React from "react";
import { CellStyling } from "./styles/CellStyling";
import { TETRISBLOCKS } from "../tetrisBlocks";

function Cell({ type }) {
  return <CellStyling type={type} color={TETRISBLOCKS[type].color} />;
}

export default React.memo(Cell);
