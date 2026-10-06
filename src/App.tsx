import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Alarmes from "./pages/Alarmes";
import UserLayout from "./layouts/UserLayout";


function App() {

  return (
    <>
    <BrowserRouter>
   
    <Routes>
      <Route element={<Login/>} path="/login"/>
      <Route element={<SignUp/>} path="/Signup"/>
     

      <Route element={<UserLayout/>}>
        <Route element={<Alarmes/>} path="/alarms"/>
      </Route>
      <Route element={<AdminRoute/>}>

      </Route>
    </Routes>
    
    
    </BrowserRouter>
      
    </>
  )
}

export default App
