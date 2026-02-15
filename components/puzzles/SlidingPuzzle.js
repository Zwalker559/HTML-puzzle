import { useState } from "react";

export default function SlidingPuzzle({ puzzle, onSolved }) {
  const [tiles, setTiles] = useState(puzzle.tiles);

  function moveTile(index) {
    const empty = tiles.indexOf(0);
    const size = puzzle.size;

    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(empty / size);
    const emptyCol = empty % size;

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (!isAdjacent) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[empty]] = [newTiles[empty], newTiles[index]];
    setTiles(newTiles);

    if (puzzle.check(newTiles)) {
      onSolved();
    }
  }

  return (
    <div>
      <p>{puzzle.prompt}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${puzzle.size}, 70px)`,
          gap: "6px",
          marginTop: "16px"
        }}
      >
        {tiles.map((t, i) => (
          <div
            key={i}
            onClick={() => moveTile(i)}
            style={{
              width: "70px",
              height: "70px",
              background: t === 0 ? "transparent" : "rgba(255,255,255,0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              borderRadius: "8px",
              cursor: t === 0 ? "default" : "pointer",
              border: t === 0 ? "1px dashed rgba(255,255,255,0.2)" : "none"
            }}
          >
            {t !== 0 && t}
          </div>
        ))}
      </div>
    </div>
  );
}
