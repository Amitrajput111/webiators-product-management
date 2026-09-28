import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="page-content">
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}

export default App;
