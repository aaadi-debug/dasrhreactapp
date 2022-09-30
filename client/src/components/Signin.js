import React, { useState, useContext } from 'react'
import login from '../images/login.png';
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Signin = () => {

  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();

    if(data.status === 400 || !data) {
      window.alert(`Invalid Credentials`);
      console.log(`Invalid Credentials`);
    } else {
      dispatch({  type: "USER", payload: true })
      window.alert(`Login Successful`);
      console.log(`Login Successful`);

      navigate('/');                            //after successful registration, directing the page to signin page
    }
  }

  return (
    <>
      <div className="signin">
        <div className="mt-5">
          <div className="signin-content">

            <div className="signin-img">
              <img src={login} alt="signin" />
              <NavLink to="/signup" className="signin-img-link text-center">Create an account</NavLink>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form method="POST" className="register-form" id='register-form'>
                <div className="form-group">
                  <label htmlFor="email"><i class="zmdi zmdi-email"></i></label>
                  <input type="email" name='email' id='email' placeholder='Your Email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password"><i class="zmdi zmdi-lock"></i></label>
                  <input type="password" name='password' id='password' placeholder='Your Password' autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group form-button">
                  <input type="submit" name='signin' id='signin' className='form-submit' value="Log In" onClick={loginUser} />
                </div>
              </form>
              <div className="social-media-login">
                  Or login 
                  <i class="zmdi zmdi-facebook"></i>
                  <i class="zmdi zmdi-twitter"></i>
                  <i class="zmdi zmdi-google-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin