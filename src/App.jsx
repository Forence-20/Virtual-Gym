import './App.css';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectionPractice from "./pages/SelectionPractice/SelectionPractice";
import loadable from "@loadable/component";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import  Container  from './components/Container/Container';


const PilatesPracticeBeginner = loadable(() =>
import("./pages/Practice/Pilates/Pilates-Practice-Beginner")
);
const PilatesPracticeIntermediate = loadable(() =>
import("./pages/Practice/Pilates/Pilates-Practice-Intermediate")
);
const PilatesPracticeAdvanced = loadable(() =>
import("./pages/Practice/Pilates/Pilates-Practice-Advanced")
);
const YogaPracticeBeginner = loadable(() =>
import("./pages/Practice/Yoga/Yoga-Practice-Beginner")
);
const YogaPracticeIntermediate = loadable(() =>
import("./pages/Practice/Yoga/Yoga-Practice-Intermediate")
);
const YogaPracticeAdvanced = loadable(() =>
import("./pages/Practice/Yoga/Yoga-Practice-Advanced")
);
function App() {
  return (
    <div className='App'>
        <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/pilates-practice-intermediate"
            element={
              <PrivateRoute>
                <PilatesPracticeIntermediate />
              </PrivateRoute>
            }
          />
            <Route
            path="/pilates-practice-beginner"
            element={
              <PrivateRoute>
                <PilatesPracticeBeginner />
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
            path="/pilates-practice-advanced"
            element={
              <PrivateRoute>
                <PilatesPracticeAdvanced />
              </PrivateRoute>
            }
          />
          <Route
            path="/yoga-practice-beginner"
            element={
              <PrivateRoute>
                <YogaPracticeBeginner />
              </PrivateRoute>
            }
          />
          <Route
            path="/yoga-practice-intermediate"
            element={
              <PrivateRoute>
                <YogaPracticeIntermediate />
              </PrivateRoute>
            }
          />
          <Route
            path="/yoga-practice-advanced"
            element={
              <PrivateRoute>
                <YogaPracticeAdvanced />
              </PrivateRoute>
            }
          />
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
          {/* <Route
            path="/about"
            element={
              <PrivateRoute>
                <AboutUs />
              </PrivateRoute>
            }
          />  */}
        </Routes>
        </AuthProvider>

        </Router>
   </div>
  );
}

export default App;
