import React, { createContext, useReducer } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom'
import { initialState, reducer } from './reducer/UseReducer';
import SideBar from "./components/Sidebar/SideBar";

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Guest from './components/Guest'
import Contact from './components/Contact'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ErrorPage from './components/Errorpage'
import Logout from './components/Logout'

import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";


  // 1. Context API
  export const UserContext = createContext();

  const Routing = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />

        <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Setting />} />
      </Routes>
    )
  }


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Routing />
    </UserContext.Provider>
    </>
  )
}

export default App