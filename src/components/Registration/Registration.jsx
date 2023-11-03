import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
import { registrationSchema } from '../../utils/validation'
const Registration = () => {
   
  return (
      <EntryForm
          buttonText='Create an account'
          formTitle='Registration'
          linkText='Already have an account?'
          linkTitle='login'
          linkTo='/login'
          isRegistration={true}
          validationSchema={registrationSchema}
      />   
      
  )
}

export default Registration