import { CellType } from "../components/Grid";

// const OBSTACLE = -1;
// const EMPTY = 0;

// validate if the move is within the grid and the cell is not an obstacle and not visited
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

// DFS Algorithm
export const dfs = (
  grid: CellType[][],
  start: { row: number; col: number },
  end: { row: number; col: number }
): { row: number; col: number }[] => {
  const rows = grid.length;
  const cols = grid[0].length;

  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const path: { row: number; col: number }[] = [];
  const stack: { row: number; col: number }[] = [];

  stack.push(start);
  visited[start.row][start.col] = true;

  const possibleMovements = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const { row, col } = current;
    path.push(current);

    // if the end is reached, return the path
    if (row === end.row && col === end.col) {
      return path;
    }

    // explore the 4 possible movements
    for (const movement of possibleMovements) {
      const newRow = row + movement.x;
      const newCol = col + movement.y;

      if (isValidMove(newRow, newCol, grid, visited)) {
        stack.push({ row: newRow, col: newCol });
        visited[newRow][newCol] = true;
      }
    }
  }

  return []; // no path found
};
