export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export function checkforCollisions(player, stage, { x: i, y: j }) {
  for (let y = 0; y < player.tetrisblocks.length; y++) {
    for (let x = 0; x < player.tetrisblocks[y].length; x++) {
      if (player.tetrisblocks[y][x] !== 0) {
        if (
          !stage[y + player.pos.y + j] ||
          !stage[y + player.pos.y + j][x + player.pos.x + i] ||
          stage[y + player.pos.y + j][x + player.pos.x + i][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
}
