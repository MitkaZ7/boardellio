import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshUserToken, checkIdToken, verifyToken, authorizeUser } from '../../store/slices/userSlice';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.user);
  const tokens = JSON.parse(localStorage.getItem('jwt') || '{}');

  useEffect(() => {
    // dispatch(authorizeUser(tokens.accessToken))
    
    if (tokens.idToken) {
      dispatch(checkIdToken(tokens.idToken));
      dispatch(authorizeUser(tokens.idToken));
      console.log('isAuthorized: ', isAuthorized);

    }
    

   
  }, []);
  
  if (!isAuthorized && !tokens.refreshToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;

