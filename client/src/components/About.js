import React, { useEffect, useState } from 'react'
import adityaPic from '../images/photo.jpeg';
import annoymusPic from '../images/annoymus.png';
import SideBar from './Sidebar/SideBar';
import { Link, useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState('');   // instead of '' we can use {}

  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status === 200) {
        const error = new Error(res.error);     // or we can throw err dynamically as we simply do it by --  throw new Error(`User not found`)
        throw error;
      }

    } catch (err) {
      console.log(err);
      navigate('/signin');
    }
  }

  useEffect(() => {     //when page loads useEffect will render the about page  
    callAboutPage();
  }, []);

  return (
    <>
      <div className="sidebar-with-detils">
        <SideBar />
        <div className="container emp-profile">
          <form method='GET'>
            <div className="row">

              {/* <div className="col-md-4">
                <img src={ userData.name === 'Aditya raj gupta' ? adityaPic : annoymusPic} alt="employee" />
              </div> */}

              <div className="col-md-6">
                <div className="profile-head">
                  <div className="profile-head-resp">
                    <h5> { userData.name } </h5>
                    <h6> { userData.work } </h6>
                    {/* <p className='profile-rating mt-3 mb-5'>RANKINGS: <span> 8/10 </span></p> */}
                  </div>

                  <div className="nav nav-tabs" role='tablist'>
                    <li className="nav-item">
                      <Link to="#home" className="nav-link active show" id='home-tab' data-toggle="tab" role='tab'>About</Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link to="#profile" className="nav-link" id='profile-tab' data-toggle="tab" role='tab'>Timeline</Link>
                    </li> */}
                  </div>
                </div>
              </div>
              {/* <div className="col-md-2">
                <input type="submit" name='btnAddMore' className='profile-edit-btn' value='Edit Profile' />
              </div> */}

            </div>

            <div className="row">
              {/* <div className="col-md-4">
                <div className="profile-work">
                  <p>WORK LINK</p>
                  <Link to="youtube.com" target='_blank'>YouTube</Link> <br />
                  <Link to="instagram.com" target='_blank'>Instagram</Link> <br />
                  <Link to="portfolio.com" target='_blank'> { userData.name } </Link> <br />
                  <Link to="github.com" target='_blank'>GitHub Profile</Link> <br />
                  <Link to="profession.com" target='_blank'> { userData.work } </Link> <br />
                </div>
              </div> */}

              <div className="col-md-8 pl-5 about-info">
                <div className="tab-content" id='myTabContent'>
                  {/* home-tab */}
                  <div className="tab-pane fade in active" id='home' role='tabpanel' area-aria-labelledby='home-tab'>

                    <div className="row">
                      <div className="col-md-6">
                        <label>USER ID</label>
                      </div>
                      <div className="col-md-6">
                        <p> { userData._id } </p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>NAME</label>
                      </div>
                      <div className="col-md-6">
                        <p>{ userData.name }</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>EMAIL</label>
                      </div>
                      <div className="col-md-6">
                        <p> { userData.email } </p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>PHONE</label>
                      </div>
                      <div className="col-md-6">
                        <p> { userData.phone } </p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>PROFESSION</label>
                      </div>
                      <div className="col-md-6">
                        <p> { userData.work } </p>
                      </div>
                    </div>

                  </div>

                  {/* profile-tab */}
                  {/* <div className="tab-pane fade in" id='profile' role='tabpanel' area-aria-labelledby='profile-tab'>

                    <div className="row">
                      <div className="col-md-6">
                        <label>EXPERIENCE</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>HOURLY RATE</label>
                      </div>
                      <div className="col-md-6">
                        <p>10$/Hr</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>TOTAL PROJECTS</label>
                      </div>
                      <div className="col-md-6">
                        <p>101</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>ENGLISH LEVEL</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>AVAILABILITY</label>
                      </div>
                      <div className="col-md-6">
                        <p>6 Months</p>
                      </div>
                    </div>

                  </div> */}

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default About