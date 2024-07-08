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
  const [isObstacleMode, setIsObstacleMode] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    if (!startCell) {
      setStartCell({ row, col });
      newGrid[row][col].isStart = true;
    } else if (!endCell) {
      setEndCell({ row, col });
      newGrid[row][col].isEnd = true;
    } else if (isObstacleMode) {
      newGrid[row][col].isObstacle = !newGrid[row][col].isObstacle;
    }
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(createInitialGrid());
    setStartCell(null);
    setEndCell(null);
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            isObstacleMode ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setIsObstacleMode(!isObstacleMode)}
        >
          {isObstacleMode ? "Disable Obstacle Mode" : "Enable Obstacle Mode"}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={clearGrid}
        >
          Clear Grid
        </button>
      </div>

      <div className="grid grid-cols-50 gap-0.5">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((cell, cellIdx) => (
              <Cell
                key={cellIdx}
                isStart={cell.isStart}
                isEnd={cell.isEnd}
                isObstacle={cell.isObstacle}
                onClick={() => handleCellClick(rowIdx, cellIdx)}
              />
            ))}
          </div>
        ))}
      </div>
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
