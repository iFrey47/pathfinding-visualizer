import React from "react";

interface CellProps {
  isStart: boolean;
  isEnd: boolean;
  isObstacle: boolean;
  isVisited: boolean;
  isPath: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
}

const Cell: React.FC<CellProps> = ({
  isStart,
  isEnd,
  isObstacle,
  isPath,
  isVisited,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const baseClass = "w-6 h-6 border border-gray-300";

  let extraClassName = "";

  if (isStart) {
    extraClassName = "bg-green-500";
  } else if (isEnd) {
    extraClassName = "bg-red-500";
  } else if (isObstacle) {
    extraClassName = "bg-black";
  } else if (isPath) {
    extraClassName = "bg-blue-500";
  } else if (isVisited) {
    extraClassName = "bg-yellow-500";
  }

  return (
    <div
      className={`${baseClass} ${extraClassName}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export default Cell;
