import loadConfig from "../utils/loadConfig";

export default function Home() {
  const config = loadConfig();

  function start() {
    const expiresAt = Date.now() + config.timerSeconds * 1000;
    localStorage.setItem("expiresAt", String(expiresAt));

    const indices = Array.from({ length: config.puzzles.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    sessionStorage.setItem("puzzleOrder", JSON.stringify(indices));

    const progress = Array(config.puzzles.length).fill(false);
    sessionStorage.setItem("progress", JSON.stringify(progress));

    sessionStorage.removeItem("puzzleCache");

    window.location.href = "/puzzle/1";
  }

  return (
    <div>
      <h1>Puzzle Gauntlet</h1>
      <p>
        You have {Math.floor(config.timerSeconds / 60)}:
        {String(config.timerSeconds % 60).padStart(2, "0")} to solve all puzzles
        in a random order. If the timer hits zero, everything resets.
      </p>
      <button onClick={start}>Start</button>
    </div>
  );
}
