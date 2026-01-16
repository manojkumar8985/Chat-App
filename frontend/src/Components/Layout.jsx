import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import { THEMES } from "../constant";

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "forest"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const changeTheme = (theme) => {
    setTheme(theme.name);
    localStorage.setItem("theme", theme.name);
  };

  return (
    <div className="app" data-theme={theme}>

      <Sidebar />

      <main className="main">
        <TopBar changeTheme={changeTheme} selectedTheme={theme} />
        <div className="content">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

