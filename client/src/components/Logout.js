import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {   // useEffect not support async await, so using promises
        fetch('/logout', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({  type: "USER", payload: false })
            navigate('/signin', { replace: true });
            if(res.status !== 200) {
                const error = new Error(res.error); 
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    });

  return (
    <div>Logged Out</div>
  )
}

export default Logout