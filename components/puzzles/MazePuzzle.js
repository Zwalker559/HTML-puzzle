import { useEffect, useState } from "react";

export default function MazePuzzle({ puzzle, onSolved }) {
  const size = puzzle.size;
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const goal = { x: size - 1, y: size - 1 };

  const walls = new Set(["1,1", "2,1", "3,3", "4,2"]);

  function move(dx, dy) {
    const nx = player.x + dx;
    const ny = player.y + dy;

    if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
    if (walls.has(`${nx},${ny}`)) return;

    const next = { x: nx, y: ny };
    setPlayer(next);

    if (next.x === goal.x && next.y === goal.y) onSolved();
  }

  let startX = 0;
  let startY = 0;

  function touchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function touchEnd(e) {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20) move(1, 0);
      if (dx < -20) move(-1, 0);
    } else {
      if (dy > 20) move(0, 1);
      if (dy < -20) move(0, -1);
    }
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowUp") move(0, -1);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const tileSize =
    typeof window !== "undefined"
      ? Math.min(50, Math.floor(window.innerWidth / (size + 2)))
      : 40;

  return (
    <div onTouchStart={touchStart} onTouchEnd={touchEnd}>
      <p>Swipe or use buttons to reach the green goal.</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
          gap: "4px",
          marginTop: "20px",
          justifyContent: "center"
        }}
      >
        {Array.from({ length: size * size }).map((_, i) => {
          const x = i % size;
          const y = Math.floor(i / size);
          const isPlayer = x === player.x && y === player.y;
          const isGoal = x === goal.x && y === goal.y;
          const isWall = walls.has(`${x},${y}`);

          return (
            <div
              key={i}
              style={{
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                background: isPlayer
                  ? "cyan"
                  : isGoal
                  ? "lime"
                  : isWall
                  ? "rgba(255,0,0,0.4)"
                  : "rgba(255,255,255,0.1)",
                borderRadius: "6px"
              }}
            />
          );
        })}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => move(0, -1)}>↑</button>
        <div>
          <button onClick={() => move(-1, 0)}>←</button>
          <button onClick={() => move(1, 0)}>→</button>
        </div>
        <button onClick={() => move(0, 1)}>↓</button>
      </div>
    </div>
  );
}
