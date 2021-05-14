import { useState, useEffect, useCallback } from "react";

export function useGameStatus(rowsCleared) {
  const [level, setLevel] = useState(0);
  const [rows, setRows] = useState(0);
  const [score, setScore] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calculateScore = useCallback(() => {
    const linePointsFormula = linePoints[rowsCleared - 1] * (level + 1);
    if (rowsCleared > 0) {
      setScore((prev) => prev + linePointsFormula);
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore, rowsCleared, score]);

  // console.log([score, setScore, rows, setRows, level, setLevel])

  return [score, setScore, rows, setRows, level, setLevel];
}
