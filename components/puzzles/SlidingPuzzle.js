import { useState, useEffect, useRef } from "react";

export default function SlidingPuzzle({ puzzle, onSolved }) {
  const [tiles, setTiles] = useState(puzzle.tiles);
  const size = puzzle.size;

  // --- TOUCH SWIPE SUPPORT ---
  const touchStart = useRef(null);

  function handleTouchStart(e) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function handleTouchEnd(e) {
    if (!touchStart.current) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    const empty = tiles.indexOf(0);
    const row = Math.floor(empty / size);
    const col = empty % size;

    let target = null;

    if (absX > absY) {
      if (dx > 20 && col > 0) target = empty - 1; // swipe right
      if (dx < -20 && col < size - 1) target = empty + 1; // swipe left
    } else {
      if (dy > 20 && row > 0) target = empty - size; // swipe down
      if (dy < -20 && row < size - 1) target = empty + size; // swipe up
    }

    if (target !== null) moveTile(target);
  }

  // --- TILE MOVE ---
  function moveTile(index) {
    const empty = tiles.indexOf(0);

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

    if (puzzle.check(newTiles)) onSolved();
  }

  // --- RESPONSIVE TILE SIZE ---
  const tileSize = Math.min(90, Math.floor(window.innerWidth / (size + 2)));

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <p>{puzzle.prompt}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
          gap: "6px",
          marginTop: "16px",
          justifyContent: "center"
        }}
      >
        {tiles.map((t, i) => (
          <div
            key={i}
            onClick={() => moveTile(i)}
            style={{
              width: `${tileSize}px`,
              height: `${tileSize}px`,
              background: t === 0 ? "transparent" : "rgba(255,255,255,0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: `${tileSize * 0.4}px`,
              borderRadius: "8px",
              cursor: t === 0 ? "default" : "pointer",
              border: t === 0 ? "1px dashed rgba(255,255,255,0.2)" : "none",
              userSelect: "none"
            }}
          >
            {t !== 0 && t}
          </div>
        ))}
      </div>
    </div>
  );
}
