import { CellType } from "../components/Grid";
import { dijkstra } from "../algorithms/Dijkstra";

// visualize Dijkstra Algorithm
export const visualizeDijkstra = async (
  grid: CellType[][],
  start: { row: number; col: number },
  end: { row: number; col: number },
  setGrid: React.Dispatch<React.SetStateAction<CellType[][]>>
) => {
  const path = dijkstra(grid, start, end);

  for (const node of path) {
    grid[node.row][node.col].isVisited = true;
    setGrid([...grid]);
    await new Promise((resolve) => setTimeout(resolve, 50)); // delay for visualization
  }

  // highlight the path to the end node
  if (
    path.length > 0 &&
    path[path.length - 1].row === end.row &&
    path[path.length - 1].col === end.col
  ) {
    for (const node of path) {
      grid[node.row][node.col].isPath = true;
      setGrid([...grid]);
      await new Promise((resolve) => setTimeout(resolve, 30)); // delay for path highlighting
    }
  }
};
