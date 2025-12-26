import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.jsx"
import StudentHome from "../pages/StudentHome.jsx";
import About from "../pages/About.jsx";
import Login from "../pages/Login.jsx";
import AuthSuccess from "../pages/AuthSuccess.jsx";
import Profile from "../pages/Profile.jsx";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<StudentHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
