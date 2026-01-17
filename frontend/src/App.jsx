import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.jsx"
import StudentHome from "../pages/StudentHome.jsx";
import AdminHome from "../pages/AdminHome.jsx";
import About from "../pages/About.jsx";
import Login from "../pages/Login.jsx";
import AuthSuccess from "../pages/AuthSuccess.jsx";
import Profile from "../pages/Profile.jsx";
import Activities from "../pages/Activities.jsx";
import StudentsList from "../pages/StudentsList.jsx";
import ProtectedRoute from '../components/ProtectedRoute';


function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<StudentHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activities" element={<Activities />} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/students" element={<StudentsList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App;