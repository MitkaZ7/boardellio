import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'
const RequireAuth = ({children}) => {
  const userData = localStorage.getItem('userData');
    const location = useLocation();
    const {isAuthorized} = useSelector(state => state.user);
    const isUserAuthorized = isAuthorized || localStorage.getItem('isAuthorized') === 'true';
  if (!isUserAuthorized) {
        return <Navigate to='/unauthorized' state={{from: location}}/>
    }
  return children;
   
  
}

export default RequireAuth



// import { useLocation, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import React from 'react';
// import { getUserDataFromToken } from '../../utils/firebase';

// const RequireAuth = ({ children }) => {
//   const location = useLocation();
//   const { isAuthorized, token } = useSelector(state => state.user);
//   const isUserAuthorized = isAuthorized || token;

//   if (!isUserAuthorized) {
//     return <Navigate to="/unauthorized" state={{ from: location }} />;
//   }

//   return children;
// };

// export default RequireAuth;