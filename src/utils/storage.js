const CONV_KEY = "conversations";
const THEME_KEY = "theme";

export const getConversations = () => {
  try {
    return JSON.parse(localStorage.getItem(CONV_KEY)) || [];
  } catch {
    return [];
  }
};

// Insert, or update if a conversation with the same id exists
export const saveConversation = (conv) => {
  const all = getConversations();
  const i = all.findIndex((c) => c.id === conv.id);
  if (i >= 0) all[i] = conv;
  else all.unshift(conv);
  localStorage.setItem(CONV_KEY, JSON.stringify(all));
};

export const getTheme = () => localStorage.getItem(THEME_KEY) || "light";
export const setTheme = (t) => localStorage.setItem(THEME_KEY, t);