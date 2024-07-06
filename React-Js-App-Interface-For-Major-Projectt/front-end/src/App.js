import React from "react";
import { useAuth } from "./components/users/AuthContext";
import "./style.css";

import UserDash from "./components/users/Dashboard/UserDash";
import MyUser from "./components/users/MyUser";
// import User from "./components/users/User";
const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated && <MyUser />}
      {!isAuthenticated && <UserDash />}
      {/* {!isAuthenticated && <SysRoutes />} */}
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
