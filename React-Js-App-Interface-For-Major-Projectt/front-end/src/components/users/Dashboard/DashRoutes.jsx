import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../../admin/Admin";


import Homies from "./Homies";
import Manage from "./Manage";
import Setting from "./Setting";
import ContactForm from "./Contact";
import Help from "./Help";
import Logout from "./Logout";
const DashRoutes=()=>{
    return(<>
    <Routes>
        <Route path='/dash' element={<Admin/>}  />
        <Route path='/d-home' element={<Homies/>}  />
        <Route path='/manage' element={<Manage/>}  />
        <Route path='/setting' element={<Setting/>}  />
        <Route path='/contact' element={<ContactForm/>}  />
        <Route path='/help' element={<Help/>} />
        <Route path='/logout' element={<Logout/>} />
    </Routes>
    </>)
}
export default DashRoutes;