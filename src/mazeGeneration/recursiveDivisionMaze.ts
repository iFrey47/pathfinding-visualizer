import { CellType } from "../components/Grid";

export const generateRecursiveDivisionMaze = (
  grid: CellType[][]
): CellType[][] => {
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isObstacle: false }))
  );

  const width = newGrid[0].length;
  const height = newGrid.length;

  const divide = (
    x: number,
    y: number,
    w: number,
    h: number,
    orientation: string
  ) => {
    if (w < 2 || h < 2) return;

    const horizontal = orientation === "H";
    const wx = x + (horizontal ? 0 : Math.floor(Math.random() * (w - 2)) + 1);
    const wy = y + (horizontal ? Math.floor(Math.random() * (h - 2)) + 1 : 0);
    const px = wx + (horizontal ? Math.floor(Math.random() * w) : 0);
    const py = wy + (horizontal ? 0 : Math.floor(Math.random() * h));

    const dx = horizontal ? 1 : 0;
    const dy = horizontal ? 0 : 1;
    const length = horizontal ? w : h;

    for (let i = 0; i < length; i++) {
      if (wx + i * dx !== px || wy + i * dy !== py) {
        newGrid[wy + i * dy][wx + i * dx].isObstacle = true;
      }
    }

    const nx = x;
    const ny = y;
    const nw = horizontal ? w : wx - x;
    const nh = horizontal ? wy - y : h;
    divide(nx, ny, nw, nh, chooseOrientation(nw, nh));

    const nx2 = horizontal ? x : wx + 1;
    const ny2 = horizontal ? wy + 1 : y;
    const nw2 = horizontal ? w : x + w - wx - 1;
    const nh2 = horizontal ? y + h - wy - 1 : h;
    divide(nx2, ny2, nw2, nh2, chooseOrientation(nw2, nh2));
  };

  const chooseOrientation = (w: number, h: number): string => {
    if (w < h) {
      return "H";
    } else if (h < w) {
      return "V";
    } else {
      return Math.random() < 0.5 ? "H" : "V";
    }
  };

  divide(0, 0, width, height, chooseOrientation(width, height));
  return newGrid;
};
