import { useState } from "react";
import StarRating from "./StarRating";

export default function FeedbackModal({ initialRating = 0, initialText = "", onSubmit, onClose }) {
  const [rating, setRating] = useState(initialRating);
  const [text, setText] = useState(initialText);

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>Conversation saved!</h2>
        <p>How was your experience?</p>
        <StarRating value={rating} onChange={setRating} />
        <textarea
          rows="4"
          placeholder="Any other feedback?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Skip
          </button>
          <button type="button" onClick={() => onSubmit(rating, text)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}