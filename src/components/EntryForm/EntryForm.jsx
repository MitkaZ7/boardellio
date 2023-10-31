import React, { useState,useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loginSchema, registrationSchema } from '../../utils/validation'
const EntryForm = ({ buttonText, formTitle, linkText, linkTitle, linkTo, children, isRegistration }) => {
    const filledInputLabelClass = 'entryForm__input_state_filled';
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [filledInput, setFilledInput] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showValidationError, setShowValidationError] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        // Используйте useEffect для слежения за изменениями в поле "пароль"
        if (isValid) {
            setShowConfirmation(true); // Показать поле "подтверждение пароля"
        } else {
            setShowConfirmation(false); // Скрыть поле "подтверждение пароля"
        }
    }, [isValid]);
    

    // function handleFocusInput(e) {
    //     if (e.currentTarget === e.target) {
    //         console.log('focused input');
    //         e.currentTarget.classList.add(filledInputLabelClass)
    //         setFilledInput(true);
    //         console.log(filledInput)
    //         console.log(e.currentTarget);
    //     }
    // }
    // function handleUnfocusInput(e) {
    //     if (e.currentTarget === e.target) {
    //         console.log('unfocused input');
    //         console.log(e.currentTarget);
    //         setFilledInput(false);
    //     }
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
    const onSubmit = (data) => {
        console.log(data);
        if (isRegistration) {
            const { error } = registrationSchema.validate(data);
            if (error) {
                setShowValidationError(true);
                console.log('Validation err: ' + error);
                return;
            }
        } else {
            const { error } = loginSchema.validate(data);
            setShowValidationError(true);

            console.log('Validation err: ' + error);
        }
     
        
        setShowValidationError(false);
    }

    return (
        <div className='entryForm-container'>

            <form className='entryForm' onSubmit={handleSubmit(onSubmit)}>
                <h3 className="entryForm__title">{formTitle}</h3>
                <fieldset className='entryForm__fieldset'>
                    <div className='entryForm__input-container'>
                        <input
                            className='entryForm__input'

                            // className={`entryForm__input ${isValid ? 'entryForm__input_state_filled' : ''}`}
                            id='input-email'
                            type='email'
                            name='email'
                            // placeholder='email'
                            {...register('email')}
                            required
                            // onChange={(e) => {
                            //    console.log(e.target.value)
                            // }}
                        />
                        <label
                            className='entryForm__label'
                            // className={`entryForm__label ${isValid ? 'entryForm__input_state_filled' : ''}`}
                            htmlFor='input-email'>
                            email
                        </label>
                        {errors.email && 
                            <span className='entryForm__input-error'>{errors.email.message}</span>
                        }
                    </div>
                    <div className='entryForm__input-container'>
                        <input

                            className='entryForm__input'
                            id='input-password'
                            type='password'
                            name='password'
                            placeholder='password'
                            {...register('password')}
                            // onChange={(e) => {
                            //     console.log(e.target.value)
                            // }}
                        />
                        <label
                            className='entryForm__label'
                            // className={`entryForm__label ${password ? 'entryForm__input_state_filled' : ''}`}
                            htmlFor='input-password'>
                            password
                        </label>
                        {showValidationError && errors.password && (
                            <span className='entryForm__input-error'>{errors.password.message}</span>
                        )}
                    </div>
                    {showConfirmation && isRegistration && ( // Показать только при регистрации и валидном пароле
                        <div className='entryForm__input-container'>
                            <input
                                className='entryForm__input'
                                id='input-confirmed-password'
                                type='password'
                                name='confirmedPassword'
                                placeholder='confirm password'
                                {...register('confirmedPassword')}
                                required
                            />
                            <label
                                className='entryForm__label'
                                // className={`entryForm__label ${confirmedPassword ? 'entryForm__input_state_filled' : ''}`}
                                htmlFor='input-confirmed-password'>
                                confirm password
                            </label>
                            {errors.confirmedPassword && (
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