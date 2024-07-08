import React from "react";

interface CellProps {
  isStart: boolean;
  isEnd: boolean;
  isObstacle: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
  //   onClick: () => void;
}

const Cell: React.FC<CellProps> = ({
  isStart,
  isEnd,
  isObstacle,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const baseClass = "w-6 h-6 border border-gray-300";
  const extraClassName = isStart
    ? "bg-green-500"
    : isEnd
    ? "bg-red-500"
    : isObstacle
    ? "bg-black"
    : "";

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
