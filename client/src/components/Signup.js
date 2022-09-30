import React, { useState } from 'react'
import signup from '../images/signup.png';
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();  //useHistory is replaced by useNavigate -- so, history to navigate

  const [user, setUser] = useState({ 
    name:'', email:'', phone:'', work:'', password:'', cpassword:''      //using value attribute in input of html form to take dynamic input
  });
  
  let name, value;

  const handleInputs = (e) => {       // when user will type, this function stores the data in inputs via onChange attribute in html form
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]: value});    // first, getting the data entered by user dynamically in ...user using spread operator, 
                                          // then storing it in [name]: value pair 
  }

  // Finally, connecting frontend with backend using fetch api by async await and sending data in databases
  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;  //getting pure data from user.name and all in user -- this is object destructuring

    // using fetch api
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({                              //using stringify() to convert json into string coz server don't understand json format 
        name, email, phone, work, password, cpassword     // In reality, it is of the form name:name, and all
      })
    });

    const data = await res.json();                        //checking data now

    if(data.status === 422 || !data) {                    //from auth.js in server getting status===422 or if data not present then alert
      window.alert(`Invalid Registration`);
      console.log(`Invalid Registration`);
    } else {
      window.alert(`Registration Successful`);
      console.log(`Registration Successful`);

      navigate('/signin');                            //after successful registration, directing the page to signin page
    }
  }

  return (
    <>
      <div className="signup">
        <div className="mt-5">
          <div className="signup-content">

            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <form action="POST" className="register-form" id='register-form'>

                <div className="form-group">
                  <label htmlFor="name"><i class="zmdi zmdi-account"></i></label>
                  <input type="text" name='name' id='name' placeholder='Your Name' autoComplete='off' value={user.name} onChange={handleInputs} />
                </div>
                <div className="form-group">
                  <label htmlFor="email"><i class="zmdi zmdi-email"></i></label>
                  <input type="email" name='email' id='email' placeholder='Your Email' autoComplete='off' value={user.email} onChange={handleInputs} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone"><i class="zmdi zmdi-phone"></i></label>
                  <input type="text" name='phone' id='phone' placeholder='Your Phone' autoComplete='off' value={user.phone} onChange={handleInputs} />
                </div>
                <div className="form-group">
                  <label htmlFor="work"><i class="zmdi zmdi-slideshow"></i></label>
                  <input type="text" name='work' id='work' placeholder='Your Profession' autoComplete='off' value={user.work} onChange={handleInputs} />
                </div>
                <div className="form-group">
                  <label htmlFor="password"><i class="zmdi zmdi-lock"></i></label>
                  <input type="password" name='password' id='password' placeholder='Your Password' autoComplete='off' value={user.password} onChange={handleInputs} />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword"><i class="zmdi zmdi-lock"></i></label>
                  <input type="password" name='cpassword' id='cpassword' placeholder='Confirm Password' autoComplete='off' value={user.cpassword} onChange={handleInputs} />
                </div>
                <div className="form-group form-button">
                  <input type="submit" name='signup' id='signup' className='form-submit' value="Register" onClick={PostData} />
                </div>

              </form>
            </div>
            <div className="signup-img">
              <img src={signup} alt="signup" />
              <NavLink to="/signin" className="signup-img-link text-center">I am already registered</NavLink>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signup