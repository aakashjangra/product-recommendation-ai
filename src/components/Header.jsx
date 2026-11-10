export default function Header({ theme, onToggle }) {
  return (
    <header className="header">
      <h1>Product Recommendation AI</h1>
      <button
        type="button"
        className="theme-btn"
        onClick={onToggle}
        aria-label="Toggle dark/light mode"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}