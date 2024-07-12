import { CellType } from "../components/Grid";

export const generateRoomMaze = (grid: CellType[][]): CellType[][] => {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isObstacle: true }))
  );

  const carvePath = (path: [number, number][]) => {
    for (const [x, y] of path) {
      newGrid[x][y].isObstacle = false;
    }
  };

  // Define the main path
  const mainPath: [number, number][] = [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],
    [1, 11],
    [1, 12],
    [1, 13],
    [1, 14],
    [2, 14],
    [3, 14],
    [4, 14],
    [5, 14],
    [6, 14],
    [7, 14],
    [8, 14],
    [9, 14],
    [10, 14],
    [11, 14],
    [12, 14],
    [13, 14],
    [14, 14],
    [14, 13],
    [14, 12],
    [14, 11],
    [14, 10],
    [14, 9],
    [14, 8],
    [14, 7],
    [14, 6],
    [14, 5],
    [14, 4],
    [14, 3],
    [14, 2],
    [14, 1],
    [13, 1],
    [12, 1],
    [11, 1],
    [10, 1],
    [9, 1],
    [8, 1],
    [7, 1],
    [6, 1],
    [5, 1],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1],
  ];

  // Carve the main path
  carvePath(mainPath);

  // Define additional paths and rooms
  const additionalPaths: [number, number][][] = [
    [
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [3, 9],
      [3, 10],
      [3, 11],
      [3, 12],
    ],
    [
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [5, 9],
      [5, 10],
      [5, 11],
      [5, 12],
    ],
    [
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 8],
      [7, 9],
      [7, 10],
      [7, 11],
      [7, 12],
    ],
    [
      [9, 3],
      [9, 4],
      [9, 5],
      [9, 6],
      [9, 7],
      [9, 8],
      [9, 9],
      [9, 10],
      [9, 11],
      [9, 12],
    ],
    [
      [11, 3],
      [11, 4],
      [11, 5],
      [11, 6],
      [11, 7],
      [11, 8],
      [11, 9],
      [11, 10],
      [11, 11],
      [11, 12],
    ],
    [
      [13, 3],
      [13, 4],
      [13, 5],
      [13, 6],
      [13, 7],
      [13, 8],
      [13, 9],
      [13, 10],
      [13, 11],
      [13, 12],
    ],
  ];

  // Carve additional paths
  for (const path of additionalPaths) {
    carvePath(path);
  }

  // Define connections between main path and additional paths
  const connections: [number, number][] = [
    [2, 3],
    [4, 3],
    [6, 3],
    [8, 3],
    [10, 3],
    [12, 3],
    [2, 12],
    [4, 12],
    [6, 12],
    [8, 12],
    [10, 12],
    [12, 12],
  ];

  // Carve connections
  carvePath(connections);

  return newGrid;
};
