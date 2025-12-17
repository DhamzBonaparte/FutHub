import { Outlet } from "react-router-dom";
import ASidebar from "../../../Components/Sidebar/ASidebar";

export default function Admin(){
    return(
        <>
        <ASidebar/>
        <div className="main-content">
            <Outlet/>
        </div>
        </>
    )
}