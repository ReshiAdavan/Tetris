import { useState } from "react";

import { createStage, checkforCollisions } from "../helper";
import { TetrisStylingWrapped, TetrisStyling } from "./styles/TetrisStyling";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./Start";

import { BrowserRouter as Router /*Route, Link*/ } from "react-router-dom";
import axios from "axios";

function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  //   console.log('re-render');

  function movePlayer(dir) {
    if (!checkforCollisions(player, stage, { x: dir, y: 0 })) {
      updatePlayerPosition({ x: dir, y: 0 });
    }
  }

  function startGame() {
    setScore(0);
    setRows(0);
    setLevel(0);
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  }

  function drop() {
    const levelFormula = (level + 1) * 2;
    const DropTimeFormula = 1000 / (level + 1) + 200;
    if (rows >= levelFormula) {
      setLevel((prev) => prev + 1);
      setDropTime(DropTimeFormula);
    }

    if (!checkforCollisions(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collision: false });
    } else {
      if (player.pos.y < 1) {
        // console.log("GAME OVER!!!");

        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collision: true });
    }
  }

  function keyUp({ keyCode }) {
    if (!gameOver && (keyCode === 40 || keyCode === 83 || keyCode === 75)) {
      // console.log("interval on");
      setDropTime(1000 / (level + 1) + 200);
    }
  }

  function dropPlayer() {
    // console.log("interval off");
    setDropTime(null);
    drop();
  }

  /* function hardDrop () {
    let pot = 0;
    while (!checkforCollisions(player, stage, { x: 0, y: pot })) {
      setDropTime(5);
      pot += 1;
    } 

    updatePlayerPosition({ x: 0, y: pot - 1, collision: true });
  }; */

  function move({ keyCode }) {
    if (!gameOver && (keyCode === 37 || keyCode === 65 || keyCode === 74)) {
      movePlayer(-1);
    } else if (!gameOver && (keyCode === 39 || keyCode === 68 || keyCode === 76)) {
      movePlayer(1);
    } else if (!gameOver && (keyCode === 40 || keyCode === 83 || keyCode === 75)) {
      dropPlayer();
    } else if (!gameOver && (keyCode === 38 || keyCode === 87 || keyCode === 73)) {
      playerRotate(stage, 1);
    } /* else if (!gameOver && (keyCode === 32)) {
        hardDrop(); 
      } */
  }

  useInterval(() => {
    drop();
  }, dropTime);

  if (gameOver) {
    let newLeaderboard = { score, rows, level };
    axios
      .post("http://localhost:5000/leaderboards/add", newLeaderboard)
      .then((res) => console.log(res.data));
  }

  return (
    <Router>
      <TetrisStylingWrapped
        role="button"
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        onKeyUp={keyUp}
      >
        <TetrisStyling>
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <div>
                <Display gameOver={gameOver} text="Game Over" />
                {/* <Route path="" component={f()} /> */}
              </div>
            ) : (
              <div>
                <Display text={`Level: ${level}`} />
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
              </div>
            )}
            <StartButton callback={startGame} />
          </aside>
        </TetrisStyling>
      </TetrisStylingWrapped>
    </Router>
  );
}

export default Tetris;
