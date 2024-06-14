import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../../admin/Admin";


import Homies from "./Homies";
import Manage from "./Manage";
import Setting from "./Setting";
import Contact from "./Contact";
import Help from "./Help";
const DashRoutes=()=>{
    return(<>
    <Routes>
        <Route path='/dash' element={<Admin/>}  />
        <Route path='/d-home' element={<Homies/>}  />
        <Route path='/manage' element={<Manage/>}  />
        <Route path='/setting' element={<Setting/>}  />
        <Route path='/contact' element={<Contact/>}  />
        <Route path='/help' element={<Help/>} />
    </Routes>
    </>)
}
export default DashRoutes;