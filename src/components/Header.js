import { useEffect, useState } from "react";
import "../styles/Header.css";

function Header() {
  const [currentTheme, setCurrentTheme] = useState("light-theme");

  useEffect(() => {
    document.body.classList = currentTheme;
  }, [currentTheme]);

  function toggleTheme() {
    setCurrentTheme(
      (currentTheme) =>
        (currentTheme =
          currentTheme === "light-theme" ? "dark-theme" : "light-theme")
    );
  }

  return (
    <div className="header">
      <div className="header-wrapper">
        <h2 className="header-title">TODO</h2>
        <div className="toggle-theme-btn" onClick={toggleTheme}>
          <img
            className="toggle-theme-icon"
            src={require("../images/icon-moon.svg").default}
            alt="toggle theme icon"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
