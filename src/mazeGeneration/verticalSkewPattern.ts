
import { CellType } from "../components/Grid";

export const verticalSkewMazeGeneration = (grid: CellType[][]): CellType[][] => {
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isObstacle: true }))
  );

  const width = newGrid[0].length;
  const height = newGrid.length;

  const isInBounds = (x: number, y: number) =>
    x >= 0 && x < width && y >= 0 && y < height;

  const createStairPattern = () => {
    let x = 0;
    let y = height - 1;

    while (isInBounds(x, y)) {
      newGrid[y][x].isObstacle = false;

      if ((x + y) % 2 === 0) {
        if (isInBounds(x + 1, y)) {
          x++;
        } else if (isInBounds(x, y - 1)) {
          y--;
        } else {
          break;
        }
      } else {
        if (isInBounds(x, y - 1)) {
          y--;
        } else if (isInBounds(x + 1, y)) {
          x++;
        } else {
          break;
        }
      }
    }
  };

  createStairPattern();

  return newGrid;
};
