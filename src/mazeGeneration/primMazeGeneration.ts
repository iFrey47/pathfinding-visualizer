import { CellType } from "../components/Grid";

export const generatePrimMaze = (grid: CellType[][]): CellType[][] => {
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isObstacle: true }))
  );

  const width = newGrid[0].length;
  const height = newGrid.length;

  const isWithinBounds = (x: number, y: number): boolean => {
    return x > 0 && x < width - 1 && y > 0 && y < height - 1;
  };

  const getNeighbors = (x: number, y: number): [number, number][] => {
    const neighbors: [number, number][] = [];
    if (isWithinBounds(x + 2, y)) neighbors.push([x + 2, y]);
    if (isWithinBounds(x - 2, y)) neighbors.push([x - 2, y]);
    if (isWithinBounds(x, y + 2)) neighbors.push([x, y + 2]);
    if (isWithinBounds(x, y - 2)) neighbors.push([x, y - 2]);
    return neighbors;
  };

  const walls: [number, number][] = [];
  newGrid[1][1].isObstacle = false;
  walls.push(...getNeighbors(1, 1));

  while (walls.length > 0) {
    const randomIndex = Math.floor(Math.random() * walls.length);
    const [x, y] = walls.splice(randomIndex, 1)[0];

    if (newGrid[y][x].isObstacle) {
      const neighbors = getNeighbors(x, y).filter(
        ([nx, ny]) => !newGrid[ny][nx].isObstacle
      );

      if (neighbors.length === 1) {
        const [nx, ny] = neighbors[0];
        newGrid[(y + ny) / 2][(x + nx) / 2].isObstacle = false;
        newGrid[y][x].isObstacle = false;
        walls.push(...getNeighbors(x, y));
      }
    }
  }

  return newGrid;
};
