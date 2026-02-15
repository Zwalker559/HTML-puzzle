import { useState } from "react";

export default function EscapeRoom({ puzzle, onSolved }) {
  const [found, setFound] = useState(false);
  const [input, setInput] = useState("");

  function tryUnlock() {
    if (puzzle.check(input)) {
      onSolved();
    }
  }

  return (
    <div>
      <p>{puzzle.prompt}</p>
      {!found && (
        <div
          onClick={() => setFound(true)}
          style={{
            marginTop: "20px",
            width: "260px",
            height: "160px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "1px solid rgba(0,255,255,0.4)"
          }}
        >
          <span>Click around the room...</span>
        </div>
      )}

      {found && (
        <div style={{ marginTop: "20px" }}>
          <p>You found a note with a code: <strong>{puzzle.code}</strong></p>
          <input
            placeholder="Enter the code to escape"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button onClick={tryUnlock}>Unlock Door</button>
        </div>
      )}
    </div>
  );
}
