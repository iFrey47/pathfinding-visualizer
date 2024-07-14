
import { CellType } from "../components/Grid";

export const generatePrimMaze = (grid: CellType[][]): CellType[][] => {
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

  const isInBounds = (x: number, y: number) =>
    x > 0 && x < width - 1 && y > 0 && y < height - 1;

  const shuffleArray = (array: any[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const getNeighbors = (x: number, y: number): [number, number, number, number][] => {
    const neighbors: [number, number, number, number][] = [];
    for (const [dx, dy] of directions) {
      const nx = x + 2 * dx;
      const ny = y + 2 * dy;
      if (isInBounds(nx, ny) && newGrid[ny][nx].isObstacle) {
        neighbors.push([x + dx, y + dy, nx, ny]);
      }
    }
    shuffleArray(neighbors);
    return neighbors;
  };

  const startX = 1;
  const startY = 1;
  newGrid[startY][startX].isObstacle = false;

  const walls: [number, number, number, number][] = getNeighbors(startX, startY);

  while (walls.length > 0) {
    const [wallX, wallY, cellX, cellY] = walls.pop()!;
    if (newGrid[cellY][cellX].isObstacle) {
      newGrid[wallY][wallX].isObstacle = false;
      newGrid[cellY][cellX].isObstacle = false;
      walls.push(...getNeighbors(cellX, cellY));
    }
  }

  return newGrid;
};
