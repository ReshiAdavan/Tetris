import { useCallback, useState } from "react";
import { checkforCollisions, STAGE_WIDTH } from "../helper";

import { TETRISBLOCKS, randomTetrisBlock } from "../tetrisBlocks";

export function usePlayer() {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetrisblocks: TETRISBLOCKS[0].shape,
    collision: false,
  });

  function rotate(matrix, dir) {
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    if (dir > 0) {
      return rotatedTetro.map((row) => row.reverse());
    }
    return rotatedTetro.reverse();
  }

  function playerRotate(stage, dir) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetrisblocks = rotate(clonedPlayer.tetrisblocks, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkforCollisions(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -1 * (offset + offset > 0 ? 1 : -1);
      if (offset > clonedPlayer.tetrisblocks[0].length) {
        rotate(clonedPlayer.tetrisblocks, -1 * dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  function updatePlayerPosition({ x, y, collision }) {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collision,
    }));
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetrisblocks: randomTetrisBlock().shape,
      collision: false,
    });
  }, []);

  return [player, updatePlayerPosition, resetPlayer, playerRotate];
}
