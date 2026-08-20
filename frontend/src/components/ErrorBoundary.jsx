import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="products-page" style={{ padding: "3rem 1rem", textAlign: "center" }}>
          <div style={{ maxWidth: "500px", margin: "0 auto", background: "#ffffff", padding: "2rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
            <h2 style={{ color: "#0f172a", marginBottom: "1rem" }}>Something went wrong</h2>
            <p style={{ color: "#64748b", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              {this.state.error?.message || "An unexpected error occurred while loading this view."}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="secondary-btn"
                style={{ padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}
              >
                Reload Page
              </button>
              <Link
                to="/products"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="primary-btn"
                style={{ padding: "10px 20px", borderRadius: "8px", textDecoration: "none" }}
              >
                Back to Products
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
