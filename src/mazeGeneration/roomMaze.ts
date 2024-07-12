import { CellType } from "../components/Grid";

export const generateRoomMaze = (grid: CellType[][]): CellType[][] => {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isObstacle: true }))
  );

  const carveRoom = (
    x: number,
    y: number,
    width: number,
    height: number
  ): void => {
    for (let i = y; i < y + height; i++) {
      for (let j = x; j < x + width; j++) {
        if (i >= 0 && i < rows && j >= 0 && j < cols) {
          newGrid[i][j].isObstacle = false;
        }
      }
    }
  };

  const carveHallway = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): void => {
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        newGrid[y][x1].isObstacle = false;
      }
    } else if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        newGrid[y1][x].isObstacle = false;
      }
    }
  };

  const roomWidth = Math.floor(cols / 3);
  const roomHeight = Math.floor(rows / 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      carveRoom(
        j * roomWidth + 1,
        i * roomHeight + 1,
        roomWidth - 2,
        roomHeight - 2
      );
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      carveHallway(
        (j + 1) * roomWidth,
        i * roomHeight + Math.floor(roomHeight / 2),
        (j + 1) * roomWidth,
        (i + 1) * roomHeight - Math.floor(roomHeight / 2)
      );
      carveHallway(
        j * roomWidth + Math.floor(roomWidth / 2),
        (i + 1) * roomHeight,
        (j + 1) * roomWidth - Math.floor(roomWidth / 2),
        (i + 1) * roomHeight
      );
    }
  }

  return newGrid;
};
