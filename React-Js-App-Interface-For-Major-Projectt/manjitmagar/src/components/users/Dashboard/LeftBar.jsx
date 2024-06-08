import React from "react";
import { Link } from "react-router-dom";
import './static/dashboard.css'
const LeftBar=()=>{
return(<>
   
    
        <div className="info"></div>
        <div className="dashnav">
            <nav>
                <ul>
                <li>
                <Link to='/dash'>Dashboard</Link>    
                </li>
                <li>
                <Link to='/d-home'>Home</Link>    
                </li>
                <li>
                <Link to='/manage'>Manage</Link>    
                </li>
                <li>
                <Link to='/setting'>SYS-Setting</Link>    
                </li>
                <li>
                <Link to='/dash'>Contact</Link>    
                </li>
                <li>
                <Link to='/help'>?help</Link>    
                </li>
                
                
                </ul></nav>
        </div>
    
   

</>)

}
export default LeftBar;