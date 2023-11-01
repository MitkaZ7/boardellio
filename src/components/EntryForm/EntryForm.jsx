import React, { useState,useEffect } from 'react'
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { schema, loginSchema, registrationSchema } from '../../utils/validation'
const EntryForm = ({ buttonText, formTitle, linkText, linkTitle, linkTo, children, isRegistration }) => {
    const filledInputLabelClass = 'entryForm__input_state_filled';
    const { register, 
        handleSubmit,
        reset, 
        formState: { 
            errors, 
            isValid, 
            isDirty 
        } 
    } = useForm({
        mode: 'onTouched',
        resolver: joiResolver(schema),
        // reValidateMode: 'onChange'
    }); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showValidationError, setShowValidationError] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    let navigate = useNavigate();
    // useEffect(() => {
    //     console.log()
    //     // Используйте useEffect для слежения за изменениями в formState.isValid
    //     if (isValid) {
    //         setShowConfirmation(true); // Показать поле "подтверждение пароля"
    //     } else {
    //         setShowConfirmation(false); // Скрыть поле "подтверждение пароля"
    //     }
    // }, [showConfirmation]);
    

    
    const onSubmit = (data) => {
        console.log(data);
        // if (isRegistration) {
        //     const { error } = registrationSchema.validate(data);
        //     if (error) {
               
        //         setShowValidationError(true);
        //         console.log('Validation err: ' + error);
        //         return;
        //     }
        // } else {
        //     const { error } = loginSchema.validate(data);
        //     setShowValidationError(true);

        //     console.log('Validation err: ' + error);
        // }
     
        // setShowValidationError(false);
        reset();
    }

    return (
        <div className='entryForm-container'>
            <form className='entryForm' onSubmit={handleSubmit(onSubmit)}>
                <h3 className="entryForm__title">{formTitle}</h3>
                <fieldset className='entryForm__fieldset'>
                    <div className='entryForm__input-container'>
                      
                            <input
                                className='entryForm__input'
                                id='email'
                                type='email'
                        
                                placeholder='Email'
                                {...register('email')}
                                required
                            // onChange={(e) => {
                               
                            //     console.log(isValid)
                            // }}
                            />
                        
                        <label
                            className='entryForm__label'
                            htmlFor='email'>
                            email
                        </label>
                        <div className='entryForm__input-error'>
                            {errors?.email && <span>{errors.email.message}</span>}
                        </div>
                    </div>
                    <div className='entryForm__input-container'>
                            <input
                                className='entryForm__input'
                                id='password'
                                type='password'
                                placeholder='Password'
                                {...register('password')}
                            />
                        <label
                            className='entryForm__label'
                            htmlFor='input-password'>
                            password
                        </label>
                        <div className='entryForm__input-error'>
                            {errors?.password && <span>{errors.password.message}</span>}
                        </div>
                    </div>
                    {isRegistration && ( 
                        <div className='entryForm__input-container'>
                            
                            <input
                                className='entryForm__input'
                                id='confirmpassword'
                                type='password'
                         
                                placeholder='Confirm password'
                                {...register('confirmPassword')}
                                required
                            />
                            <label
                                className='entryForm__label'
                                htmlFor='confirm-password'>
                                confirm password
                            </label>
                            <div className='entryForm__input-error'>
                            {errors?.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                            </div>
                        </div>
                    )}
                </fieldset>
                <button disabled={!isValid} type='submit' className='entryForm__btn-submit'>{buttonText}</button>
                <span className='entryForm__links'>{linkText}&nbsp;<Link className='entryForm__link' to={linkTo}>{linkTitle}</Link></span>

            </form>
        </div>
    )
}

export default EntryForm