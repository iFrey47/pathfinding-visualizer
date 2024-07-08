import React from "react";
import Cell from "./Cells";

const Grid: React.FC = () => {
  const numRows = 20;
  const numCols = 50;

  const renderGrid = () => {
    let grid = [];
    let cellId = 0;

    for (let row = 0; row < numRows; ++row) {
      for (let col = 0; col < numCols; ++col) {
        grid.push(<Cell key={cellId} id={cellId} />);
        ++cellId;
      }
    }
    return grid;
  };

  return <div className="grid grid-cols-20 gap-0.5">{renderGrid()}</div>;
};

export default Grid;
