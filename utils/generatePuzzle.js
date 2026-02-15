export default function generatePuzzle(cfg) {
  if (cfg.type === "riddle") {
    return {
      type: "riddle",
      prompt: cfg.prompt,
      check: (input) =>
        cfg.answers.map((a) => a.toLowerCase()).includes(input.toLowerCase())
    };
  }

  if (cfg.type === "code") {
    const code = Array.from({ length: cfg.length }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    return {
      type: "code",
      prompt: `Enter the ${cfg.length}-digit code:`,
      code,
      check: (input) => input === code
    };
  }

  if (cfg.type === "math") {
    const a = Math.floor(Math.random() * 10 * cfg.difficulty);
    const b = Math.floor(Math.random() * 10 * cfg.difficulty);
    const op = Math.random() < 0.5 ? "+" : "-";
    const answer = op === "+" ? a + b : a - b;

    return {
      type: "math",
      prompt: `Solve: ${a} ${op} ${b}`,
      answer,
      check: (input) => parseInt(input, 10) === answer
    };
  }

  if (cfg.type === "sliding") {
    const size = cfg.size || 3;
    const tiles = Array.from({ length: size * size }, (_, i) => i);

    // Shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    // NEW: flexible solved check
    const checkSolved = (arr) => {
      const solvedA = arr.every((v, i) => v === i); // 0 at start
      const solvedB = arr.slice(0, -1).every((v, i) => v === i + 1) && arr[arr.length - 1] === 0; // 0 at end
      return solvedA || solvedB;
    };

    return {
      type: "sliding",
      prompt: "Arrange the tiles into the correct order.",
      tiles,
      size,
      check: checkSolved
    };
  }

  if (cfg.type === "escapeRoom") {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    return {
      type: "escapeRoom",
      room: cfg.room || "room",
      code,
      check: (input) => input === code
    };
  }

  if (cfg.type === "maze") {
    return {
      type: "maze",
      size: cfg.size || 8
    };
  }

  return {
    type: "unknown",
    prompt: "Unknown puzzle type.",
    check: () => false
  };
}
