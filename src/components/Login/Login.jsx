import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
import { loginSchema } from '../../utils/validation'
import Tooltip from '../Tooltip/Tooltip'
import { resetError } from '../../store/slices/userSlice'
import WithTranslation from '../hoc/WithTranslation'
const Login = ({t}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const authError = useSelector(state => state.user.error)
  const fromPage = location.state?.from?.pathname || '/';
  const { isShown, message } = useSelector((state) => state.tooltip); 

  return (
    <>
      {isShown && <Tooltip messageText={message} />} 
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

export default WithTranslation(Login);