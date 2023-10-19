import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
const Login = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // let navigate = useNavigate();
    // function handleChangeEmail(evt) {
    //     setEmail(evt.target.value);
    // }
    // function handleChangePassword(evt) {
    //     setPassword(evt.target.value);
    // }

    // const handleLogin = (evt) => {
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
          buttonText='Login'
          formTitle='Login'
          linkText='Don`t have an account?'
          linkTitle='Registrate'
        //   onSubmit={handleLogin}
          linkTo='/registration'
      >
          {/* <label className="entryForm__label">email</label>
          <input
              className="entryForm__input"
              id="inputEmail"
              type="email"
              name="email"
              placeholder=""
              onChange={handleChangeEmail}
              value={email}
              required
          />
          
          <span className="form__input-error"></span> */}
          
          {/* <span className="entryForm__input-border"></span> */}
          {/* <label className="entryForm__label">password</label>
          <input
              className="entryForm__input"
              id="input-password"
              type="password"
              name="password"
              placeholder=""
              onChange={handleChangePassword}
              value={password}
          /> */}
        
          {/* <span className="entryForm__input-border"></span> */}
      </EntryForm>
  )
}

export default Login