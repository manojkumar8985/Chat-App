import { Bell, LogOut, Sun, Check } from "lucide-react";
import "./Topbar.css";
import userAuth from "../hooks/useAuthUser";
import { Link } from "react-router-dom";
import { THEMES } from "../constant";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

import { useLogout } from "../hooks/useLogout";

const TopBar = ({ changeTheme, selectedTheme }) => {
  const { user } = userAuth();
  const [open, setOpen] = useState(false);
  const { logout } = useLogout();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleThemeChange = (theme) => {
    changeTheme(theme);
    setOpen(false);
    toast.success(`Theme changed to ${theme.label}`);
  };

  return (
    <header className="topbar">
      <div className="topbar-left" />

      <div className="topbar-right">
        {/* 🌞 THEME DROPDOWN */}
        <div className="theme-wrapper" ref={dropdownRef}>
          <button className="topbar-btn" onClick={() => setOpen(!open)}>
            <Sun size={18} color="#f97316" />
          </button>

          {open && (
            <div className="theme-dropdown">
              {THEMES.map((theme) => {
                const active = selectedTheme === theme.name;

                return (
                  <div
                    key={theme.name}
                    className={`theme-item ${active ? "active" : ""}`}
                    onClick={() => handleThemeChange(theme)}
                  >
                    <div className="theme-colors">
                      {theme.colors.map((color, i) => (
                        <span key={i} style={{ backgroundColor: color }} />
                      ))}
                    </div>

                    <span className="theme-label">{theme.label}</span>

                    {active && <Check size={14} className="theme-check" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button className="topbar-btn">
          <Link to="/notifications">
            <Bell size={18} color="#facc15" />
            <span className="notification" />
          </Link>
        </button>

        <div className="topbar-profile">
          <img src={user.pic} alt="profile" />
        </div>

        <button className="topbar-btn logout" onClick={logout}>
          <LogOut size={18} color="#ef4444" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
