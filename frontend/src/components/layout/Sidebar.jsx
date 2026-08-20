import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">P</div>
        <div>
          <strong>ProductHub</strong>
          <span>Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-title">MENU</p>

        <NavLink to="/products" className={linkClass}>
          <span>▦</span>
          Products
        </NavLink>

        <NavLink to="/products/new" className={linkClass}>
          <span>＋</span>
          Add Product
        </NavLink>

        <NavLink to="/dashboard" className={linkClass}>
          <span>▥</span>
          Dashboard
        </NavLink>

        <p className="sidebar-title">MANAGEMENT</p>

        <button
          type="button"
          className="sidebar-link sidebar-button"
          onClick={() => navigate("/products")}
        >
          <span>◈</span>
          Inventory
        </button>

        <button
          type="button"
          className="sidebar-link sidebar-button"
          onClick={() => navigate("/products")}
        >
          <span>◉</span>
          Categories
        </button>
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-link sidebar-button logout-button"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
