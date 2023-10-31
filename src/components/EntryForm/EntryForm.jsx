import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loginSchema, registrationSchema } from '../../utils/validation'
const EntryForm = ({ buttonText, formTitle, linkText, linkTitle, linkTo, children, isRegistration }) => {
    // const filledInputLabelClass = 'entryForm__input_state_filled';
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [filledInput, setFilledInput] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showError, setShowError] = useState(false)
    let navigate = useNavigate();
    function handleChangeEmail(evt) {
        console.log(evt)
        setEmail(evt.target.value);
    }
    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }
    function handleChangeConfirmedPassword(evt) {
        setConfirmedPassword(evt.target.value);
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

    const onSubmit = (data) => {
        
        if (isRegistration) {
            const { error } = registrationSchema.validate(data);
            if (error) {
                setShowError(true);
                console.log('Validation registration err: ' + error);
                return;
            }
        } else {
            const {error} = loginSchema.validate(data);
            setShowError(true);

            console.log('Validation login err: ' + error);
        }
        console.log(data);
        setShowError(false); 
    }

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
                            // value={email}
                            {...register('email')}
                            // required
                        />
                        <label
                            className={`entryForm__label ${email ? 'entryForm__input_state_filled' : ''}`} 
                            htmlFor='input-email'>
                            email
                        </label>
                        {showError && errors.email && (
                            <span className='entryForm__input-error'>{errors.email.message}</span>
                        )}
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
                            // {...register('password')}
                        />
                        <label
                            className={`entryForm__label ${password ? 'entryForm__input_state_filled' : ''}`} 
                            htmlFor='input-password'>
                            password
                        </label>
                        {showError && errors.password && (
                            <span className='entryForm__input-error'>{errors.password.message}</span>
                        )}
                    </div>
                    {isRegistration && isValid && ( // Показать только при регистрации и валидном пароле
                        <div className='entryForm__input-container'>
                            <input
                                className='entryForm__input'
                                id='input-confirmed-password'
                                type='password'
                                name='confirmedPassword'
                                placeholder='confirm password'
                                onChange={handleChangeConfirmedPassword}
                                value={confirmedPassword}
                                // {...register('confirmedPassword')}
                            />
                            <label
                                className={`entryForm__label ${confirmedPassword ? 'entryForm__input_state_filled' : ''}`}
                                htmlFor='input-confirmed-password'>
                                confirm password
                            </label>
                            {showError && errors.confirmedPassword && (
                                <span className='entryForm__input-error'>{errors.confirmedPassword.message}</span>
                            )}
                        </div>
                    )}
                </fieldset>
                <button type='submit' className='entryForm__btn-submit'>{buttonText}</button>
                <span className='entryForm__links'>{linkText}&nbsp;<Link className='entryForm__link' to={linkTo}>{linkTitle}</Link></span>

            </form>
        </div>
    )
}

export default EntryForm
