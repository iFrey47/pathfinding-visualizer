import React, { useState } from "react";
import Cell from "./Cells";

import { visualizeAStar } from "../visualizations/AStarVisualization";
import { visualizeBFS } from "../visualizations/BFSVisualization";
import { visualizeDFS } from "../visualizations/DFSVisualization";
import { visualizeDijkstra } from "../visualizations/DijkstraVisualization";

import { dfsMazeGeneration } from "../mazeGeneration/dfsBasedMazeGeneration";
import { generatePrimMaze } from "../mazeGeneration/primMazeGeneration";
import { generateRecursiveDivisionMaze } from "../mazeGeneration/recursiveDivisionMaze";
import { verticalSkewMazeGeneration } from "../mazeGeneration/verticalSkewPattern";

export interface CellType {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isObstacle: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousCell: CellType | null;
}

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
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const [selectAlgorithms, setSelectAlgorithms] = useState<string | null>(null);
  const [showMazes, setShowMazes] = useState(false);
  const [mazeType, setMazeType] = useState<string | null>(null);

  const handleMouseDown = (row: number, col: number) => {
    if (!startCell) {
      setStartCell({ row, col });
      updateGrid(row, col, "isStart", true);
    } else if (!endCell) {
      setEndCell({ row, col });
      updateGrid(row, col, "isEnd", true);
    } else if (isObstacleMode) {
      updateGrid(row, col, "isObstacle", true);
      setIsMousePressed(true);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isMousePressed && isObstacleMode) {
      updateGrid(row, col, "isObstacle", true);
    }
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const updateGrid = (
    row: number,
    col: number,
    property: "isStart" | "isEnd" | "isObstacle",
    value: boolean
  ) => {
    const newGrid = grid.map((r, rowIndex) => {
      return r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, [property]: value };
        }
        return cell;
      });
    });
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(createInitialGrid());
    setStartCell(null);
    setEndCell(null);
    setIsObstacleMode(false);
    setSelectAlgorithms(null);
    setMazeType(null);
  };

  const handleAlgorithmSelect = (algorithm: string) => {
    setSelectAlgorithms(algorithm);
    setShowAlgorithms(false);
  };

  const handleMazeGenerate = (mazeType: string) => {
    console.log(`Generating maze: ${mazeType}`);
    setMazeType(mazeType);
    let newGrid;
    switch (mazeType) {
      case "dfsMazeGeneration":
        newGrid = dfsMazeGeneration(grid);
        break;

      case "generatePrimMaze":
        newGrid = generatePrimMaze(grid);
        break;
      case "generateRecursiveDivisionMaze":
        newGrid = generateRecursiveDivisionMaze(grid);
        break;
      // case "RecursiveHorizontalSkew":
      //   newGrid = generateRecursiveHorizontalSkewMaze(grid);
      //   break;
      case "verticalSkewMazeGeneration":
        newGrid = verticalSkewMazeGeneration(grid);
        break;
      default:
        newGrid = grid;
    }
    setGrid(newGrid);
    setShowMazes(false);
  };

  const startVisualization = async () => {
    if (startCell && endCell) {
      if (selectAlgorithms === "DFS") {
        await visualizeDFS(grid, startCell, endCell, setGrid);
      } else if (selectAlgorithms === "BFS") {
        await visualizeBFS(grid, startCell, endCell, setGrid);
      } else if (selectAlgorithms === "A*") {
        visualizeAStar(grid, startCell, endCell);
      } else if (selectAlgorithms === "Dijkstra") {
        await visualizeDijkstra(grid, startCell, endCell, setGrid);
      }
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            isObstacleMode ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setIsObstacleMode(!isObstacleMode)}
          disabled={!startCell || !endCell}
        >
          {isObstacleMode ? "Disable Obstacles" : "Enable Obstacles"}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={clearGrid}
        >
          Clear Grid
        </button>

        <div className="relative">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setShowAlgorithms(!showAlgorithms)}
          >
            {selectAlgorithms
              ? `Algorithm: ${selectAlgorithms}`
              : "Select Algorithm"}
          </button>
          {showAlgorithms && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAlgorithmSelect("DFS")}
              >
                DFS
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAlgorithmSelect("BFS")}
              >
                BFS
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAlgorithmSelect("A*")}
              >
                A*
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAlgorithmSelect("Dijkstra")}
              >
                Dijkstra
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded"
            onClick={() => setShowMazes(!showMazes)}
          >
            {mazeType ? `Maze: ${mazeType}` : "Generate Maze"}
          </button>
          {showMazes && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMazeGenerate("dfsMazeGeneration")}
              >
                DFS Based Maze Generation
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMazeGenerate("generatePrimMaze")}
              >
                Prim Maze
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  handleMazeGenerate("generateRecursiveDivisionMaze")
                }
              >
                Rerursive Division Maze
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMazeGenerate("verticalSkewMazeGeneration")}
              >
                Vertical Skew
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMazeGenerate("RoomMaze")}
              >
                Add a new one
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleMazeGenerate("JustChecking")}
              >
                Add a new one
              </div>
            </div>
          )}
        </div>

        {selectAlgorithms && (
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={startVisualization}
          >
            Visualize {selectAlgorithms}
          </button>
        )}
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
                isVisited={cell.isVisited}
                isPath={cell.isPath}
                onMouseDown={() => handleMouseDown(rowIdx, cellIdx)}
                onMouseEnter={() => handleMouseEnter(rowIdx, cellIdx)}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const createInitialGrid = (): CellType[][] => {
  const grid = [];
  for (let row = 0; row < 22; row++) {
    const currentRow = [];
    for (let col = 0; col < 60; col++) {
      currentRow.push(createCell(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createCell = (row: number, col: number): CellType => ({
  row,
  col,
  isStart: false,
  isEnd: false,
  isObstacle: false,
  isVisited: false,
  isPath: false,
  distance: Infinity,
  previousCell: null,
});

export default Grid;
