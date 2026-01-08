import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDarkState] = useState<boolean>(false);

  // Sync with DOM when component mounts
  useEffect(() => {
    const saved = localStorage.getItem("gilgal-theme");
    const shouldBeDark = saved === "dark";
    setIsDarkState(shouldBeDark);

    // Apply to DOM
    const html = document.documentElement;
    if (shouldBeDark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
    }
  }, []);

  // Update DOM when theme changes
  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
      localStorage.setItem("gilgal-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
      localStorage.setItem("gilgal-theme", "light");
    }
  }, [isDark]);

  const setIsDark = (dark: boolean) => {
    setIsDarkState(dark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
