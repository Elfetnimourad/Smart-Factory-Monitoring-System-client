import { Navigate,Outlet } from "react-router-dom";

const AdminRoute = ()=>{
    // get the token 
     const token = localStorage.getItem("token");
     const role = "ADMIN";                                 

    // Not Logged In 
if(!token){
   return <Navigate to={"/login"} replace/>
}
    // Logged In But Not Admin 
if(role !== "ADMIN"){
    return <Navigate to={"/"} replace/>
}

    return <Outlet/>
}
export default AdminRoute;