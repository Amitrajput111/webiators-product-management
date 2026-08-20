import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Navbar />

        <div className="page-content">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
