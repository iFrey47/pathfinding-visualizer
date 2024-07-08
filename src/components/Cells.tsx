import React from "react";

interface CellProps {
  id: number;
}

const Cell: React.FC<CellProps> = ({ id }) => {
  return (
    <div className="w-6 h-6 border border-gray-300" id={`cell-${id}`}></div>
  );
};

export default Cell;
