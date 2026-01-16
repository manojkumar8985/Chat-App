import { Home, Users, Bell } from "lucide-react";
import userAuth from "../hooks/useAuthUser";
import Loading from "../pages/Loading";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
    const { isLoading, user } = userAuth();
    const { pathname } = useLocation();
  if (isLoading) return <Loading />;
  return (
    <aside className="sidebar">
      {/* FIXED LOGO */}
      <div className="sidebar-logo">
        <span className="logo-icon">🟢</span>
        <span className="logo-text">Streamify</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className={`sidebar-item ${pathname === "/" ? "active" : ""}`}>
          <Home size={20} />
          <span>
            Home
          </span>
        </Link>

        <Link to="/friends" className={`sidebar-item ${pathname === "/friends" ? "active" : ""}`}>
          <Users size={20} />
          <span>
            Friends
          </span>
        </Link>

        <Link to="/notifications" className={`sidebar-item ${pathname === "/notifications" ? "active" : ""}`}>
          <Bell size={20} />
          <span>
            Notifications
          </span>
        </Link>
      </nav>

      {/* FIXED USER */}
      <div className="sidebar-user">
        <img src={user.pic} alt="user" />
        <div className="user-text">
          <p>{user.userName}</p>
          <span>● Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
