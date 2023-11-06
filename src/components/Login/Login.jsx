import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
import { loginSchema } from '../../utils/validation'
const Login = () => {

  return (
      <EntryForm
          buttonText='Login'
          formTitle='Login'
          linkText='Don`t have an account?'
          linkTitle='Registrate'
          linkTo='/registration'
          isRegistration={false}
          validationSchema={loginSchema}
      />
          
     
  )
}

export default Login