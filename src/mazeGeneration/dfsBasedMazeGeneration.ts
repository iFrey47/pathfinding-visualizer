import { CellType } from "../components/Grid";

export const dfsMazeGeneration = (grid: CellType[][]): CellType[][] => {
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isObstacle: true }))
  );

  const width = newGrid[0].length;
  const height = newGrid.length;

  const directions: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const carve = (x: number, y: number) => {
    newGrid[y][x].isObstacle = false;
    shuffleArray(directions);

    for (const [dx, dy] of directions) {
      const nx = x + 2 * dx;
      const ny = y + 2 * dy;
      if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1) {
        if (newGrid[ny][nx].isObstacle) {
          newGrid[ny - dy][nx - dx].isObstacle = false;
          carve(nx, ny);
        }
      }
    }
  };

  const shuffleArray = (array: any[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  carve(1, 1);
  return newGrid;
};
