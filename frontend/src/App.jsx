import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.jsx"
import StudentHome from "../pages/StudentHome.jsx";
import About from "../pages/About.jsx";
import Login from "../pages/Login.jsx";
import AuthSuccess from "../pages/AuthSuccess.jsx";
import Profile from "../pages/Profile.jsx";
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        {/*Public Routes*/}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/*Protected Routes*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<StudentHome />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App;
