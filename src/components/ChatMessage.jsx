import { useState } from "react";
import StarRating from "./StarRating";

export default function ChatMessage({ message, onUpdate }) {
  const [draft, setDraft] = useState(message.comment || "");
  const isBot = message.role === "bot";

  return (
    <div className={`msg-row ${isBot ? "bot" : "user"}`}>
      <div className="msg">
        <div className="bubble">{message.text}</div>

        {isBot && (
          <div className="actions">
            <button
              type="button"
              className={message.liked === "up" ? "thumb active" : "thumb"}
              onClick={() => onUpdate(message.id, { liked: "up" })}
              aria-label="Thumbs up"
            >
              👍
            </button>
            <button
              type="button"
              className={message.liked === "down" ? "thumb active" : "thumb"}
              onClick={() => onUpdate(message.id, { liked: "down" })}
              aria-label="Thumbs down"
            >
              👎
            </button>
          </div>
        )}

        {isBot && message.liked === "up" && (
          <div className="feedback-box">
            <span>Rate this answer:</span>
            <StarRating
              value={message.stars || 0}
              onChange={(n) => onUpdate(message.id, { stars: n })}
            />
          </div>
        )}

        {isBot && message.liked === "down" && (
          <div className="feedback-box">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="What went wrong?"
              aria-label="Feedback"
            />
            <button
              type="button"
              className="small-btn"
              onClick={() => onUpdate(message.id, { comment: draft })}
            >
              {message.comment ? "Saved ✓" : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}