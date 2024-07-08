import React from "react";

interface NodeProps {
  isStart: boolean;
  isEnd: boolean;
  isObstacle: boolean;
  onClick: () => void;
}

const Node: React.FC<NodeProps> = ({ isStart, isEnd, isObstacle, onClick }) => {
  const baseClass = "w-6 h-6 border border-gray-300";
  const extraClassName = isStart
    ? "bg-green-500"
    : isEnd
    ? "bg-red-500"
    : isObstacle
    ? "bg-black"
    : "";

  return (
    <div className={`${baseClass} ${extraClassName}`} onClick={onClick}></div>
  );
};

export default Node;
