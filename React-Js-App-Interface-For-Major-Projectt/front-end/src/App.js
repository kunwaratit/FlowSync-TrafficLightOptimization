import React from "react";
import { Route } from "react-router-dom";
import "./style.css";
import Admin from "./components/admin/Admin";
import { AuthProvider, useAuth } from "./components/users/AuthContext";

import MyUser from "./components/users/MyUser";
import UserDash from "./components/users/Dashboard/UserDash";
import RegistrationForm from "./components/users/registration";
import { useEffect } from "react";
import SysRoutes from "./components/users/Dashboard/system/sysroutes";
// import User from "./components/users/User";
const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated && <MyUser />}
      {isAuthenticated && <UserDash />}
      {/* {!isAuthenticated && <SysRoutes />} */}

      {/* <UserDash/> */}

      {/* Redirect to login page if trying to access admin page without login */}
      {/* {!isAuthenticated && <Route path="/admin" element={<Navigate to="/" replace />} />} */}
    </>
  );
};

export default App;




// import React from 'react';
// import VideoUpload from './components/users/VideoUP';

// function App() {
//     return (
//         <div className="App">
//             <h1>Video Upload</h1>
//             <VideoUpload />
//         </div>
//     );
// }

// export default App;

