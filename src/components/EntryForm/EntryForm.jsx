import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
const EntryForm = ({ buttonText, formTitle, linkText, linkTitle, linkTo, children, }) => {
    const filledInputLabelClass = 'entryForm__input_state_filled';
    const { register, handleSubmit } = useForm();
    const [filledInput, setFilledInput] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }
    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }
    


    const handleLogin = (evt) => {
        evt.preventDefault();
        const authData = {
            email,
            password
        }
        // dispatch(authorizeUser(authData));
        navigate('/tasks');
        return authData;
    }

    const onSubmit = (data) => console.log(data)

    return (
        <div className='entryForm-container'>

            <form className='entryForm' onSubmit={handleSubmit(onSubmit)}>
                <h3 className="entryForm__title">{formTitle}</h3>
                <fieldset className='entryForm__fieldset'>
                    <div className='entryForm__input-container'>
                        <input
                    
                            className={`entryForm__input ${email ? 'entryForm__input_state_filled' : ''}`}
                            id='input-email'
                            type='email'
                            name='email'
                            placeholder='email'
                            onChange={handleChangeEmail}
                            value={email}
                            {...register('email')}
                            // required
                        />
                        <label
                            className={`entryForm__label ${email ? 'entryForm__input_state_filled' : ''}`} 
                            htmlFor='input-email'>
                            email
                        </label>
                    </div>
                    <div className='entryForm__input-container'>
                        <input
                    
                            className='entryForm__input'
                            id='input-password'
                            type='password'
                            name='password'
                            placeholder='password'
                            onChange={handleChangePassword}
                            value={password}
                            {...register('password')}
                        />
                        <label
                            className={`entryForm__label ${password ? 'entryForm__input_state_filled' : ''}`} 
                            htmlFor='input-password'>
                            password
                        </label>

                    </div>
                </fieldset>
                <button type='submit' className='entryForm__btn-submit'>{buttonText}</button>
                <span className='entryForm__links'>{linkText}&nbsp;<Link className='entryForm__link' to={linkTo}>{linkTitle}</Link></span>

            </form>
        </div>
    )
}

export default EntryForm
