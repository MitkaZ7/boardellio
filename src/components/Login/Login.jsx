import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
import { loginSchema } from '../../utils/validation'
import Tooltip from '../Tooltip/Tooltip'
import { resetError } from '../../store/slices/userSlice'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const authError = useSelector(state => state.user.error)
  const fromPage = location.state?.from?.pathname || '/';
  const { t } = useTranslation();


  useEffect(() => {
    let timeoutId;

    if (authError) {
      setIsShown(true);
    
      timeoutId = setTimeout(() => {
        setIsShown(false);
        dispatch(resetError())
      }, 2000);
    } else {
      setIsShown(false);
    }

    return () => {
      // Очищаем таймер при размонтировании компонента
      clearTimeout(timeoutId);
    };
  }, [authError]);

  return (
      <>
      {authError && <Tooltip isShown={isShown} messageText={authError} messageType={'Error'}/>}
        <EntryForm
          buttonText={t('log-in')}
          formTitle={t('log-in')}
          linkText={t('not-registred')}
          linkTitle={t('sign-up')}
          linkTo='/registration'
          isRegistration={false}
          validationSchema={loginSchema}
        />
    </>    
     
  )
}

export default Login