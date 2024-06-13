import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import authApi from "../../utils/authApi";
import { setAuthorizationStatus,refreshUserToken } from "../../store/slices/userSlice";
const RequireAuth = ({ children }) => {

  const { accessToken, refreshToken } = JSON.parse(localStorage.getItem('jwt') || '{}');

  function handleCheckToken() {
    // authApi.checkToken(accessToken);
    // const token = localStorage.getItem('jwt');
    // if (token) {
    //   checkToken(token)
    //     .then((res) => {
    //       if (res.data.email) {
    //         setEmail(res.data.email);
    //         setLoggedIn(true);
    //         history.push('/');
    //       }
    //     })
    //     .catch((error) => {
    //       console.log('Не удалось авторизоваться' + error);
    //     })
    // }
  }




  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.user);
  // const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken)
    handleCheckToken()
  }, []);
  // useEffect(() => {
  //   if (!refreshToken) {
  //     // dispatch(refreshUserData(refreshToken));
  //     console.log('no token here', refreshToken)
  //     console.log('isisAuthorized: ' ,isAuthorized)
  //   }
  // }, [dispatch, refreshToken]);

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;




// import { useLocation, Navigate } from "react-router-dom";
// import { useSelector,useDispatch } from "react-redux";
// import React, { useEffect } from 'react';
// import { refreshUserData } from '../../store/slices/userSlice';
// const RequireAuth = ({ children }) => {
//   const location = useLocation();
//   const { isAuthorized } = useSelector(state => state.user);
//   const refreshToken = localStorage.getItem('refreshToken');
//   const isUserAuthorized = isAuthorized && refreshToken;
//   const dispatch = useDispatch(refreshToken);
  
//   if (!isUserAuthorized) {

//     return <Navigate to="/unauthorized" state={{ from: location }} />;
//   } else {
//     dispatch(refreshUserData(refreshToken));
//   }

//   return children;
// };

// export default RequireAuth;