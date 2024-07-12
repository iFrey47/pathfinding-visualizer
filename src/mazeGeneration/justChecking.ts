import { CellType } from "../components/Grid";

export const justCecking = (
  grid: CellType[][],
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: "horizontal" | "vertical",
  surroundingWalls: boolean,
  type: "wall" | "weight"
): CellType[][] => {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

  const carveWall = (x: number, y: number, isHorizontal: boolean) => {
    if (isHorizontal) {
      for (let i = colStart - 1; i <= colEnd + 1; i += 1) {
        if (i === y) continue;
        newGrid[x][i].isObstacle = type === "wall";
      }
    } else {
      for (let i = rowStart - 1; i <= rowEnd + 1; i += 1) {
        if (i === x) continue;
        newGrid[i][y].isObstacle = type === "wall";
      }
    }
  };

  if (rowEnd < rowStart || colEnd < colStart) {
    return newGrid;
  }

  if (!surroundingWalls) {
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        if (
          i === 0 ||
          j === 0 ||
          i === newGrid.length - 1 ||
          j === newGrid[0].length - 1
        ) {
          newGrid[i][j].isObstacle = type === "wall";
        }
      }
    }
    surroundingWalls = true;
  }

  if (orientation === "horizontal") {
    const possibleRows = [];
    for (let i = rowStart; i <= rowEnd; i += 2) {
      possibleRows.push(i);
    }
    const possibleCols = [];
    for (let i = colStart - 1; i <= colEnd + 1; i += 2) {
      possibleCols.push(i);
    }
    const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    const randomColIndex = Math.floor(Math.random() * possibleCols.length);
    const currentRow = possibleRows[randomRowIndex];
    const colRandom = possibleCols[randomColIndex];

    carveWall(currentRow, colRandom, true);

    justCecking(
      newGrid,
      rowStart,
      currentRow - 2,
      colStart,
      colEnd,
      "horizontal",
      surroundingWalls,
      type
    );
    justCecking(
      newGrid,
      currentRow + 2,
      rowEnd,
      colStart,
      colEnd,
      "horizontal",
      surroundingWalls,
      type
    );
  } else {
    const possibleCols = [];
    for (let i = colStart; i <= colEnd; i += 2) {
      possibleCols.push(i);
    }
    const possibleRows = [];
    for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) {
      possibleRows.push(i);
    }
    const randomColIndex = Math.floor(Math.random() * possibleCols.length);
    const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    const currentCol = possibleCols[randomColIndex];
    const rowRandom = possibleRows[randomRowIndex];

    carveWall(rowRandom, currentCol, false);

    justCecking(
      newGrid,
      rowStart,
      rowEnd,
      colStart,
      currentCol - 2,
      "vertical",
      surroundingWalls,
      type
    );
    justCecking(
      newGrid,
      rowStart,
      rowEnd,
      currentCol + 2,
      colEnd,
      "vertical",
      surroundingWalls,
      type
    );
  }

  return newGrid;
};
