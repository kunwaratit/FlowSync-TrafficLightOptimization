import React from "react";
import { Link } from "react-router-dom";
import './static/dashboard.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserTie } from '@fortawesome/free-solid-svg-icons'
const LeftBar=()=>{
return(<>
   
    
       
        <div className="dashnav">
        
            <nav>
                <ul>
                <li><div className="admin-info"></div></li>
                <Link to='/dash'><li>
                        
                {/* <FontAwesomeIcon icon={faUserTie} />Dashboard  */}
                </li></Link>   
                <Link to='/d-home'><li>
                Home</li></Link>    
                
                <Link to='/manage'><li>
               Manage</li></Link>    
                
                
                <Link to='/setting'><li>SYS-Setting   </li></Link>    
             
               
                <Link to='/contact'> <li>Contact</li></Link>    
                
               
                <Link to='/help'> <li>?help </li></Link>    
               
                
                
                </ul></nav>
        </div>
    
   

</>)

}
export default LeftBar;