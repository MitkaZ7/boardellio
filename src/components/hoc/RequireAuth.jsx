import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'
const RequireAuth = ({children}) => {
    const location = useLocation();
    const {isAuthorized} = useSelector(state => state.user);
    if (!isAuthorized) {
        return <Navigate to='/login' state={{from: location}}/>
    }
  return children;
   
  
}

export default RequireAuth