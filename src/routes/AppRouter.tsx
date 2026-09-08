import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";
import BoardPage from "../pages/BoardPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import PublicRoute from "./PublicRoute";



function AppRouter(){
    return(
       <BrowserRouter>
    <Routes>
        <Route element={<PublicRoute/>}>
           <Route path="/login" element={<LoginPage/>}/>
        </Route>
        
        <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<DashboardPage/>}/>  
            <Route path="/board" element={<BoardPage/>}/>
            <Route path="/analytics" element={<AnalyticsPage/>}/>
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
    </Routes>
    
    </BrowserRouter>
    )
    
}
export default AppRouter