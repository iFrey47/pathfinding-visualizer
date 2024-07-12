import { CellType } from "../components/Grid";

export const generateRecursiveDivisionMaze = (
  grid: CellType[][]
): CellType[][] => {
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, isObstacle: true }))
  );

  const divide = (
    x: number,
    y: number,
    width: number,
    height: number,
    orientation: string
  ) => {
    if (width < 2 || height < 2) return;

    const horizontal = orientation === "H";

    const wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)));
    const wy = y + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0);

    const px = wx + (horizontal ? Math.floor(Math.random() * width) : 0);
    const py = wy + (horizontal ? 0 : Math.floor(Math.random() * height));

    const dx = horizontal ? 1 : 0;
    const dy = horizontal ? 0 : 1;

    const length = horizontal ? width : height;

    for (let i = 0; i < length; i++) {
      if (wx + dx * i !== px || wy + dy * i !== py) {
        newGrid[wy + dy * i][wx + dx * i].isObstacle = true;
      }
    }

    const nx = x;
    const ny = y;
    const w = horizontal ? width : wx - x + 1;
    const h = horizontal ? wy - y + 1 : height;
    divide(nx, ny, w, h, chooseOrientation(w, h));

    const nx1 = horizontal ? x : wx + 1;
    const ny1 = horizontal ? wy + 1 : y;
    const w1 = horizontal ? width : x + width - wx - 1;
    const h1 = horizontal ? y + height - wy - 1 : height;
    divide(nx1, ny1, w1, h1, chooseOrientation(w1, h1));
  };

  const chooseOrientation = (width: number, height: number): string => {
    if (width < height) {
      return "H";
    } else if (height < width) {
      return "V";
    }
    return Math.random() < 0.5 ? "H" : "V";
  };

  divide(0, 0, newGrid[0].length, newGrid.length, "H");

  return newGrid;
};
