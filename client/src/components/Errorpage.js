import React from 'react'
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
  return (
    <>
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>We are sorry, page not found!</h2>
                <p>The page are you looking for might have been removed or had its name changed or is temporarily not-available.</p>
                <NavLink to="/">Back to Homepage</NavLink>
            </div>
        </div>
    </>
  )
}

export default Errorpage