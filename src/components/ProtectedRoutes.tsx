import { Navigate,Outlet } from "react-router-dom";

const ProtectedRoutes = ()=>{
    // get the token 
const token = localStorage.getItem("token");


    // Not Logged In 
    // if(!token){
    // return <Navigate to={"/login"} replace/>
    // }
     

 return <Outlet/>
}
export default ProtectedRoutes;