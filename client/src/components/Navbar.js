import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/guest">Guest</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
        </>
      )
    } else {
      return (
        <>
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/about">Dashboard</Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/guest">Guest</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Registration</Link>
              </li>
        </>
      )
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">ReactApp</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar