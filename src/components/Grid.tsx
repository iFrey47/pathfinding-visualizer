import React, { useState } from "react";
import Cell from "./Cells";

const Grid: React.FC = () => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [startCell, setStartCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [endCell, setEndCell] = useState<{ row: number; col: number } | null>(
    null
  );

  const handleNodeClick = (row: number, col: number) => {
    const newGrid = [...grid];
    if (!startCell) {
      setStartCell({ row, col });
      newGrid[row][col].isStart = true;
    } else if (!endCell) {
      setEndCell({ row, col });
      newGrid[row][col].isEnd = true;
    } else {
      newGrid[row][col].isObstacle = !newGrid[row][col].isObstacle;
    }
    setGrid(newGrid);
  };

  return (
    <div className="grid grid-cols-50 gap-0.5">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="flex">
          {row.map((cell, cellIdx) => (
            <Cell
              key={cellIdx}
              isStart={cell.isStart}
              isEnd={cell.isEnd}
              isObstacle={cell.isObstacle}
              onClick={() => handleNodeClick(rowIdx, cellIdx)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createCell(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createCell = (row: number, col: number) => ({
  row,
  col,
  isStart: false,
  isEnd: false,
  isObstacle: false,
});

export default Grid;
