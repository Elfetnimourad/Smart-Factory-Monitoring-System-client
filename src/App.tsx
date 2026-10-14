import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Alarmes from "./pages/Alarmes";
import UserLayout from "./layouts/UserLayout";
import ProductionLineCards from "./pages/Machines";
import ProductionLineDetails from "./pages/MachineDetails";
import ProductionPage from "./pages/Production";
import DashboardPage from "./pages/Dashboard";
import DowntimePage from "./pages/Downtime";
import QualityPage from "./pages/Quality";
import ReportsPage from "./pages/Reports";
import SettingsPage from "./pages/admin/Settings";
import ProfilePage from "./pages/Profile";


function App() {

  return (
    <>
    <BrowserRouter>
   
    <Routes>
      <Route element={<Login/>} path="/login"/>
      <Route element={<SignUp/>} path="/Signup"/>
     

      <Route element={<UserLayout/>}>
        <Route element={<Alarmes/>} path="/alarms"/>
        <Route element={<ProductionLineCards/>} path="/machines"/>
<Route path="/production-lines/:lineId" element={<ProductionLineDetails />} />

<Route
  path="/production"
  element={<ProductionPage />}
/>
<Route
  path="/dashboard"
  element={<DashboardPage />}
/>
<Route path="/downtime" element={<DowntimePage />} />
<Route path="/quality" element={<QualityPage />} />
<Route path="/reports" element={<ReportsPage />} />
<Route path="/settings" element={<SettingsPage />} />
<Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route element={<AdminRoute/>}>

      </Route>
    </Routes>
    
    
    </BrowserRouter>
      
    </>
  )
}

export default App
