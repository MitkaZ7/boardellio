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
        //   onSubmit={handleRegistration}
          linkTo='/login'
      > 
          {/* <label className="entryForm__label">email</label>
          <input
              className="entryForm__input"
              id="inputEmail"
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChangeEmail}
              value={email}
              required
          />
          <span className="form__input-error"></span>
          <span className="entryForm__input-border"></span>

          <label className="entryForm__label">password</label>
          <input
              className="entryForm__input"
              id="input-password"
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChangePassword}
              value={password}

          />
          <span className="entryForm__input-border"></span> */}
      </EntryForm>
  )
}

export default Registration