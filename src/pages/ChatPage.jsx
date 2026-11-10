import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import FeedbackModal from "../components/FeedbackModal";
import { getReply, formatBudget } from "../utils/bot";
import { saveConversation } from "../utils/storage";

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(null);
  const [options, setOptions] = useState([]);
  const [convId, setConvId] = useState(newId);
  const [overall, setOverall] = useState({ rating: 0, feedback: "" });
  const [showModal, setShowModal] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = getReply(trimmed, pending);
    setMessages((prev) => [
      ...prev,
      { id: newId(), role: "user", text: trimmed },
      { id: newId(), role: "bot", text: reply.text, liked: null, stars: 0, comment: "" },
    ]);
    setPending(reply.pending);
    setOptions(reply.options);
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const updateMessage = (id, patch) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const buildConversation = (o = overall) => ({
    id: convId,
    savedAt: new Date().toISOString(),
    messages,
    rating: o.rating,
    feedback: o.feedback,
  });

  const handleSave = () => {
    if (messages.length === 0) return;
    saveConversation(buildConversation());
    setShowModal(true);
  };

  const handleFeedbackSubmit = (rating, feedback) => {
    const o = { rating, feedback };
    setOverall(o);
    saveConversation(buildConversation(o));
    setShowModal(false);
  };

  const handleNew = () => {
    if (messages.length > 0) saveConversation(buildConversation());
    setMessages([]);
    setInput("");
    setPending(null);
    setOptions([]);
    setOverall({ rating: 0, feedback: "" });
    setConvId(newId());
  };

  return (
    <main className="chat-page">
      <div className="top-links">
        <Link to="/history" className="link-btn">Previous Recommendations</Link>
        <Link to="/" className="link-btn" onClick={handleNew}>Want new suggestion?</Link>
      </div>

      <section className="chat-window" aria-live="polite">
        {messages.length === 0 && (
          <div className="welcome">
            <h2>Hello! 👋</h2>
            <p>Tell me which product you are looking for and your budget, and I will suggest something you might like.</p>
          </div>
        )}

        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} onUpdate={updateMessage} />
        ))}

        {pending && options.length > 0 && (
          <div className="chips">
            {options.map((o) => (
              <button type="button" key={o} className="chip" onClick={() => send(o)}>
                {formatBudget(o)}
              </button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </section>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Please tell me about your query!"
        />
        <button type="submit">Ask</button>
      </form>

      <div className="save-row">
        <button type="button" className="save-btn" onClick={handleSave}>
          💾 Save Conversation
        </button>
      </div>

      {showModal && (
        <FeedbackModal
          initialRating={overall.rating}
          initialText={overall.feedback}
          onSubmit={handleFeedbackSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}