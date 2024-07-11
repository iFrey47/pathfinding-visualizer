import { CellType } from "../components/Grid";

const isValidMove = (
  x: number,
  y: number,
  grid: CellType[][],
  visited: boolean[][]
) => {
  return (
    x >= 0 &&
    x < grid.length &&
    y >= 0 &&
    y < grid[0].length &&
    !grid[x][y].isObstacle &&
    !visited[x][y]
  );
};

const dijkstra = (
  grid: CellType[][],
  start: { row: number; col: number },
  end: { row: number; col: number }
): { row: number; col: number }[] => {
  const rows = grid.length;
  const cols = grid[0].length;

  const dist: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const path: { row: number; col: number }[] = [];
  const pq: { dist: number; row: number; col: number }[] = [];
  const cameFrom: { [key: string]: { row: number; col: number } | null } = {};

  const possibleMovements = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  pq.push({ dist: 0, row: start.row, col: start.col });
  dist[start.row][start.col] = 0;
  cameFrom[`${start.row},${start.col}`] = null;

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist); // Sort pq to simulate priority queue
    const { dist: currentDist, row, col } = pq.shift()!;

    if (visited[row][col]) continue;
    visited[row][col] = true;

    if (row === end.row && col === end.col) {
      let temp = { row, col };
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
        const newDist = currentDist + 1; // Assuming uniform cost for movements
        if (newDist < dist[newRow][newCol]) {
          dist[newRow][newCol] = newDist;
          pq.push({ dist: newDist, row: newRow, col: newCol });
          cameFrom[`${newRow},${newCol}`] = { row, col };
        }
      }
    }
  }

  return []; // No path found
};

export { dijkstra };
