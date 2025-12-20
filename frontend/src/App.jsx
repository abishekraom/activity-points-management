import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.jsx"
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Login from "../pages/Login.jsx";
import AuthSuccess from "../pages/AuthSuccess.jsx";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
      </Routes>
    </>
  )
}

export default App;
