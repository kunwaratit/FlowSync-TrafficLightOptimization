import React from "react";
import '../static/Login.css';
const Login=()=>{

    return (<>
        <div className="login-container">
          <h1>Login</h1>
          {/* {error && <div className="error-message" style={{ color: 'red' }}> {error}</div>} */}
          <form className="login-form" >
            <input type="text" name="email" placeholder="User Email" value='' />
            <input type="password" name="password" placeholder="Password" value='' />
            <button type="submit">Login</button>
          </form>
          <div className="links">
            {/* <Link to="/Register">Sign up</Link> |<Link to="/Forgot">Forgot password?</Link>" */}
          </div>
        </div>
        </>
      );
    }
    
export default Login;
