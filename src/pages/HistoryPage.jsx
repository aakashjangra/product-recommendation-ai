import { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import { getConversations } from "../utils/storage";

export default function HistoryPage() {
  const [conversations] = useState(getConversations);
  const [filter, setFilter] = useState("all");

  const visible = conversations.filter(
    (c) => filter === "all" || c.rating === Number(filter)
  );

  return (
    <main className="history-page">
      <div className="top-links">
        <Link to="/" className="link-btn">Want new suggestion?</Link>
      </div>

      <div className="history-head">
        <h2>Previous Suggestions</h2>
        <label className="filter">
          Filter by rating:{" "}
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="0">Not rated</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} ★</option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 && <p className="empty">No saved conversations found.</p>}

      <div className="history-list">
        {visible.map((c) => (
          <article key={c.id} className="history-card">
            <div className="history-meta">
              <span>{new Date(c.savedAt).toLocaleString()}</span>
              <StarRating value={c.rating} readOnly />
            </div>
            <ul>
              {c.messages.map((m) => (
                <li key={m.id} className={m.role}>
                  <strong>{m.role === "user" ? "You" : "AI"}:</strong> {m.text}
                  {m.liked && <span> {m.liked === "up" ? "👍" : "👎"}</span>}
                  {m.stars > 0 && <span> ({m.stars}★)</span>}
                  {m.comment && <em> – “{m.comment}”</em>}
                </li>
              ))}
            </ul>
            {c.feedback && <p className="overall-feedback">Feedback: {c.feedback}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}