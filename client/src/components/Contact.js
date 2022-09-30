import React, { useEffect, useState } from 'react'

const Contact = () => {

  const [userData, setUserData] = useState({ name:"", email:"", phone:"", message:"" });   // instead of '' we can use {}

  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          // Accept: "application/json",        //coz we don't want to save cookie
          "Content-type": "application/json"
        },
        // credentials: "include"              //coz we are not sending any token
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, name: data.name, email: data.email, phone: data.phone});

      if(!res.status === 200) {
        const error = new Error(res.error);     // or we can throw err dynamically as we simply do it by --  throw new Error(`User not found`)
        throw error;
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {     //when page loads useEffect will render the about page  
    userContact();
  }, []);

  //we are storing data in states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]:value });
  }

  //send data to backend
  const contactBackend = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    //fetch api
    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();

    if (!data) {
      res.send(`Message not send`);
    } else {
      alert(`Message send`);
      setUserData({ ...userData, message: "" });  //after sending data to backend only message filed will be empty, all will same
    }
  }

  return (
    <>
      <div className="contact-info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between my-5 con-resp">
              {/* phone number */}
              <div className="contact-info-item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                <div className="contact-info-content">
                  <h5>Phone</h5>
                  <p>+91 1111 543 2198</p>
                </div>
              </div>
              {/* email */}
              <div className="contact-info-item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/email.png" alt="email" />
                <div className="contact-info-content">
                  <h5>Email</h5>
                  <p>contact@gmail.com</p>
                </div>
              </div>
              {/* address */}
              <div className="contact-info-item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/address.png" alt="address" />
                <div className="contact-info-content">
                  <h5>Address</h5>
                  <p>HSC P-24, Intro Pvt. Ltd</p>
                </div> 
              </div>
            </div>
          </div>
        </div>

        {/* contact-form */}
        <div className="contact-form">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="contact-form-container py-5">
                   <h3>Get in Touch</h3>
                   <form method='POST' id="contact-form">
                    <div className="contact-form-inputs">
                      <input type="text" className="contact-form-name input-field" id="contact-form-name" name='name' onChange={handleInputs} value={ userData.name } placeholder='Your Name' required="true" />
                      <input type="email" className="contact-form-email input-field" id="contact-form-email" name='email' onChange={handleInputs} value={ userData.email } placeholder='Your Email' required="true" />
                      <input type="text" className="contact-form-phone input-field" id="contact-form-phone" name='phone' onChange={handleInputs} value={ userData.phone } placeholder='Your Phone Number' required="true" />
                    </div>
                    <div className="contact-form-text mt-5">
                      <textarea className="text-field contact-form-message" name='message' onChange={handleInputs} value={ userData.message } placeholder='Message' id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="form-group form-button mt-5">
                      <input type="submit" name='signin' id='signin' className='form-submit contact-button' onClick={contactBackend} value="Send Message" />
                    </div>
                   </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact