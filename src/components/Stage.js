import React from "react";

import Cell from "./EachCell";
import { StageStyling } from "./styles/StageStyling";

function Stage({ stage }) {
  return (
    <StageStyling width={stage[0].length} height={stage.length}>
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </StageStyling>
  );
}

export default Stage;
