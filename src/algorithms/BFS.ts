import { CellType } from "../components/Grid";

const isValidMove = (
  x: number,
  y: number,
  grid: CellType[][],
  visited: boolean[][]
) => {
  if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
    return !grid[x][y].isObstacle && !visited[x][y];
  }
  return false;
};

export const bfs = (
  grid: CellType[][],
  start: { row: number; col: number },
  end: { row: number; col: number }
): { row: number; col: number }[] => {
  const rows = grid.length;
  const cols = grid[0].length;

  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const queue: { row: number; col: number }[] = [];
  const path: { row: number; col: number }[] = [];
  const cameFrom: { [key: string]: { row: number; col: number } | null } = {};

  queue.push(start);
  visited[start.row][start.col] = true;
  cameFrom[`${start.row},${start.col}`] = null;

  const possibleMovements = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const { row, col } = current;

    if (row === end.row && col === end.col) {
      let temp = current;
      while (temp) {
        path.push(temp);
        temp = cameFrom[`${temp.row},${temp.col}`]!;
      }
      path.reverse();
      return path;
    }

    for (const movement of possibleMovements) {
      const newRow = row + movement.x;
      const newCol = col + movement.y;

      if (isValidMove(newRow, newCol, grid, visited)) {
        queue.push({ row: newRow, col: newCol });
        visited[newRow][newCol] = true;
        cameFrom[`${newRow},${newCol}`] = { row, col };
      }
    }
  }

  return []; // no path found
};
