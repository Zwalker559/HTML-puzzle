import SlidingPuzzle from "./puzzles/SlidingPuzzle";
import EscapeRoom from "./puzzles/EscapeRoom";

export default function PuzzleUI({
  puzzle,
  input,
  setInput,
  onSubmit,
  onSolved
}) {
  if (puzzle.type === "sliding") {
    return <SlidingPuzzle puzzle={puzzle} onSolved={onSolved} />;
  }

  if (puzzle.type === "escape") {
    return <EscapeRoom puzzle={puzzle} onSolved={onSolved} />;
  }

  // Default text-input puzzles (riddle, math, code, etc.)
  return (
    <div>
      <p>{puzzle.prompt}</p>
      <input
        placeholder="Type your answer"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
