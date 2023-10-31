import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
const Registration = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // let navigate = useNavigate();
    // function handleChangeEmail(evt) {
    //     setEmail(evt.target.value);
    // }
    // function handleChangePassword(evt) {
    //     setPassword(evt.target.value);
    // }

    // const handleRegistration = (evt) => {
    //     evt.preventDefault();
    //     const authData = {
    //         email,
    //         password
    //     }
    //     // dispatch(authorizeUser(authData));
    //     navigate('/tasks');
    //     return authData;
    // }
  return (
      <EntryForm
          buttonText='Create an account'
          formTitle='Registration'
          linkText='Already have an account?'
          linkTitle='login'
          linkTo='/login'
          isRegistration={true}
      > 
         
      </EntryForm>
  )
}

export default Registration