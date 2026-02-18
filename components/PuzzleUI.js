import SlidingPuzzle from "./puzzles/SlidingPuzzle";
import MazePuzzle from "./puzzles/MazePuzzle";
import RiddleRoom from "./puzzles/RiddleRoom";

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

  if (puzzle.type === "maze") {
    return <MazePuzzle puzzle={puzzle} onSolved={onSolved} />;
  }

  if (puzzle.type === "riddleRoom") {
    return <RiddleRoom puzzle={puzzle} onSolved={onSolved} />;
  }

  return (
    <div>
      <p>{puzzle.prompt}</p>
      <input
        placeholder="Type your answer"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
