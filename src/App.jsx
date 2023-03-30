import "./App.css";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectionPractice from "./pages/SelectionPractice/SelectionPractice";
import loadable from "@loadable/component";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import AboutUs from "./pages/AboutUs/AboutUs";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Container from "./components/Container/Container";

const WorkoutPractice = loadable(() =>
  import("./pages/Practice/workout/workout-Practice")
);

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/workout-practice"
              element={
                <PrivateRoute>
                  <Container>
                    <WorkoutPractice />
                  </Container>
                </PrivateRoute>
              }
            />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Container>
                    <Dashboard />
                  </Container>
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/selection-practice"
              element={
                <PrivateRoute>
                  <Container>
                    <SelectionPractice />
                  </Container>
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <Container>
                    <AboutUs />
                  </Container>
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
