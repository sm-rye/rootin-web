const THEME_KEY = 'theme';

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') document.documentElement.classList.add('dark-theme');
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark-theme');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  return isDark;
}

export function isDarkTheme() {
  return document.documentElement.classList.contains('dark-theme');
}
