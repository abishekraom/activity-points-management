import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.jsx"
import StudentHome from "../pages/StudentHome.jsx";
import About from "../pages/About.jsx";
import Login from "../pages/Login.jsx";
import AuthSuccess from "../pages/AuthSuccess.jsx";
import Profile from "../pages/Profile.jsx";
import Activities from "../pages/Activities.jsx";
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from "../components/AdminDashboard.jsx";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* General Protected Routes (Students & Admins) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<StudentHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activities" element={<Activities />}/>
        </Route>

        {/* Admin Only Protected Routes */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Add more admin routes here as you build them, e.g., /admin/reports */}
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App;