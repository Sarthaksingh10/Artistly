"use client";
import { FaMoon, FaSun } from "react-icons/fa";
import { useThemeContext } from "./ThemeContext";
/* Theme mode button using context */
export default function ThemeModeButton() {
  const { lightMode, toggleMode } = useThemeContext();

  return (
    <button onClick={toggleMode} className="text-[20px] light:text-black">
      {lightMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
