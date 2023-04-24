import { useEffect, useState } from "react";
// import "../css/index.scss";
// import "../css/Nav.scss";

export default function DarkMode() {
  const root: any = document.querySelector(":root");
  const rootStyles = getComputedStyle(root);
  const [darkMode, setDarkMode] = useState(loadTheme);

  function loadTheme() {
    let savedTheme: any = JSON.parse(
      localStorage.getItem("darkMode") || "false"
    );
    if (savedTheme != undefined) {
      return savedTheme;
    } else {
      localStorage.setItem("darkMode", JSON.stringify(false));
      return false;
    }
  }

  useEffect(setTheme, [darkMode]);

  const darkTheme = {
    font: "#f7f7ff",
    bg: "#242424",
    contrast: "#181F23",
    accent1: "#2f5270",
    accent2: "#1e375a",
    shadow: "#333",
    hr: "#333",
  };

  const lightTheme = {
    font: "#2d3142",
    bg: "#ffffff",
    contrast: "#ad1c11",
    accent1: "#bfc0c0",
    accent2: "#4f5d75",
    shadow: "#999",
    hr: "#333",
  };

  const colors = [
    "--clr-font",
    "--clr-bg",
    "--clr-contrast",
    "--clr-accent1",
    "--clr-accent2",
    "--clr-shadow",
  ];

  function updateTheme(theme: any) {
    root.style.setProperty("--clr-font", theme.font);
    root.style.setProperty("--clr-bg", theme.bg);
    root.style.setProperty("--clr-contrast", theme.contrast);
    root.style.setProperty("--clr-accent1", theme.accent1);
    root.style.setProperty("--clr-accent2", theme.accent2);
    root.style.setProperty("--clr-shadow", theme.shadow);
    root.style.setProperty("--clr-hr", theme.hr);
  }

  function setTheme() {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    darkMode ? updateTheme(darkTheme) : updateTheme(lightTheme);
  }

  function changeTheme() {
    setDarkMode((prevTheme: any) => !prevTheme);
  }

  return (
    <button className="theme-btn" onClick={changeTheme}>
      {darkMode ? (
        <i style={{ color: "white" }} className="fa-solid fa-sun"></i>
      ) : (
        <i style={{ color: "black" }} className="fa-solid fa-moon"></i>
      )}
    </button>
  );
}
