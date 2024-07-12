import { CellType } from "../components/Grid";
export const generateBasicMaze = (grid: CellType[][]): CellType[][] => {
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isObstacle: true }))
  );
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[0].length; col++) {
      if (Math.random() < 0.3) {
        newGrid[row][col].isObstacle = false;
      }
    }
  }
  return newGrid;
};
