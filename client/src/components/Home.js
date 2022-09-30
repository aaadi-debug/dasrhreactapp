import React, { useEffect, useState } from 'react'

const Home = () => {

  const [userName, setUserName] = useState('');   // instead of '' we can use {}
  const [show, setShow] = useState(false);

  const userHome = async () => {
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
      setUserName(data.name);
      setShow(true);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {     //when page loads useEffect will render the about page  
    userHome();
  }, []);
  return (
    <>
      <div className="home-page">
        <div className="home-div">
            <p>Welcome</p>
            <h1>{ userName }</h1>
            <h2>{ show ? `Happy to see you back` : `This is the React application` }</h2>
        </div>
      </div>
    </>
  )
}

export default Home