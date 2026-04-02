import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./login/login";
import Home from "./components/homepage/home";
import ProtectedRoute from "./components/protectedRoute";
import SearchElectoral from "./components/electoral/search";
import ElectoralRecords from "./components/electoral/records";

function App() {
  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Protected Search Electoral */}
        <Route
          path="/search/:page?"
          element={
            <ProtectedRoute>
              <SearchElectoral />
            </ProtectedRoute>
          }
        />

        {/* Protected Electoral Records */}
        <Route
          path="/records/:page?"
          element={
            <ProtectedRoute>
              <ElectoralRecords />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;