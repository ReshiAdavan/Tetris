export const TETRISBLOCKS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  U: {
    shape: [
      ["U", 0, "U"],
      ["U", "U", "U"],
      [0, 0, 0],
    ],
    color: "223, 45, 68",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "175, 49, 247",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "49, 221, 247",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "226, 214, 52",
  },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "247, 155, 49",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "49, 247, 89",
  },

  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "45, 104, 223",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "223, 35, 135",
  },
};

export function randomTetrisBlock() {
  const tetroblocks = "UZOJILST";
  const randomtetrisblock =
    tetroblocks[Math.floor(Math.random() * tetroblocks.length)];
  return TETRISBLOCKS[randomtetrisblock];
}
