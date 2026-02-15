import { useState } from "react";

export default function EscapeRoomV2({ puzzle, onSolved }) {
  const [foundCode, setFoundCode] = useState(false);
  const [input, setInput] = useState("");

  const objects = [
    { id: "desk", label: "Desk", reveals: false },
    { id: "painting", label: "Painting", reveals: true },
    { id: "bookshelf", label: "Bookshelf", reveals: false }
  ];

  function clickObject(obj) {
    if (obj.reveals) setFoundCode(true);
  }

  function tryUnlock() {
    if (puzzle.check(input)) onSolved();
  }

  return (
    <div>
      <p>Escape the {puzzle.room}. Search objects for clues.</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {objects.map((obj) => (
          <div
            key={obj.id}
            onClick={() => clickObject(obj)}
            style={{
              width: "120px",
              height: "120px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid rgba(0,255,255,0.4)"
            }}
          >
            {obj.label}
          </div>
        ))}
      </div>

      {foundCode && (
        <div style={{ marginTop: "20px" }}>
          <p>You found a code: <strong>{puzzle.code}</strong></p>
          <input
            placeholder="Enter the code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={tryUnlock}>Unlock Door</button>
        </div>
      )}
    </div>
  );
}
