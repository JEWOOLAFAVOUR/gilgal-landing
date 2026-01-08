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
  const [isClient, setIsClient] = useState(false);

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true);

    // Read saved preference from localStorage
    const saved = localStorage.getItem("gilgal-theme");
    const shouldBeDark = saved === "dark";

    setIsDarkState(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  // Watch isDark and apply theme whenever it changes
  useEffect(() => {
    if (isClient) {
      applyTheme(isDark);
    }
  }, [isDark, isClient]);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    console.log("Applying theme:", dark ? "dark" : "light");
    if (dark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
      localStorage.setItem("gilgal-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
      localStorage.setItem("gilgal-theme", "light");
    }
  };

  const setIsDark = (dark: boolean) => {
    console.log("setIsDark called with:", dark);
    setIsDarkState(dark);
  };

  // Don't render until client is ready (prevents hydration mismatch)
  if (!isClient) {
    return (
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        {children}
      </ThemeContext.Provider>
    );
  }
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
