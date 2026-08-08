import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import { useContext } from "react";
import { ThemeContext } from "./theme/ThemeContext";
function App() {
    const { theme } = useContext(ThemeContext);
  return (
        <div
      style={{
        backgroundColor: theme === "dark" ? "#292727" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
      <Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
    </Routes>
    </div>
  );
}

export default App;