import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <nav className="navbar-links left">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
        </nav>

        <Link to="/" className="navbar-brand">
          Vellora
        </Link>

        <nav className="navbar-links right">
          {token ? (
            <>
              <Link to="/products/new">Add Product</Link>
              <button
                type="button"
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
