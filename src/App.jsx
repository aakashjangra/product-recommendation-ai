import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import { getTheme, setTheme } from "./utils/storage";

export default function App() {
  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(theme);
  }, [theme]);

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggle={() => setThemeState((t) => (t === "light" ? "dark" : "light"))}
      />
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </div>
  );
}