import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
const Login = () => {

  return (
      <EntryForm
          buttonText='Login'
          formTitle='Login'
          linkText='Don`t have an account?'
          linkTitle='Registrate'
        //   onSubmit={handleLogin}
          linkTo='/registration'
      // isRegistration={false}
      >
          
      </EntryForm>
  )
}

export default Login