import React, { useState, useEffect, useRef } from 'react'
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { fadeInAnimation } from '../../utils/animations'
import { createUser, authorizeUser } from '../../store/slices/userSlice';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';

import WithTranslation from '../hoc/WithTranslation';


import Popup from '../Popup/Popup';

// import { loginSchema, registrationSchema } from '../../utils/validation'
const EntryForm = ({ buttonText, formTitle, linkText, linkTitle, linkTo, isRegistration, validationSchema,t }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);
    const formRef = useRef();
    const navigate = useNavigate();


    const { register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isValid,
        }
    } = useForm({
        mode: 'all',
        resolver: joiResolver(validationSchema),
    });



    // let navigate = useNavigate();
    useEffect(() => {
        // console.log(formRef.current)
        fadeInAnimation(formRef.current)
    }, []);



    const onSubmit = (data) => {
        if (isRegistration) {
             console.log(data)
            dispatch(createUser(data))
                .then((resultAction) => {
                    if (createUser.fulfilled.match(resultAction)) {
                        // Успешная регистрация
                        reset();
                        navigate(linkTo);
                    } else {
                        // Ошибка при регистрации
                        // Можно не выполнять редирект, так как произошла ошибка
                    }
                });
        } else {
            console.log(data)
            dispatch(authorizeUser(data))
                .then((resultAction) => {
                    if (authorizeUser.fulfilled.match(resultAction)) {
                        // Успешная авторизация
                        reset();
                        navigate('/projects');
                    } else {
                        // Ошибка при авторизации
                        // Можно не выполнять редирект, так как произошла ошибка
                    }
                });
        }
    };


    return (
        <div className='entryForm-container'>
            <form className='entryForm' onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                <h3 className="entryForm__title">{formTitle}</h3>

                <fieldset className='entryForm__fieldset'>
                    <div className='entryForm__input-container'>
                        <input
                            className='entryForm__input'
                            id='email'
                            type='email'
                            placeholder='Email'
                            {...register('email')}

                        />

                        <label
                            className='entryForm__label'
                            htmlFor='email'>
                            {t('email')}
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
                            htmlFor='password'>
                            {t('password')}
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
                                htmlFor='confirmpassword'>
                                {t('confirm-password')}
                            </label>
                            <div className='entryForm__input-error'>
                                {errors?.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                            </div>
                        </div>
                    )}
                </fieldset>
                {/* <div className='entryForm__submit-error'>
                    {error && <span>{error}</span>}
                </div> */}
                <button disabled={!isValid} type='submit' className='entryForm__btn-submit'>{buttonText}</button>


                <span className='entryForm__links'>{linkText}&nbsp;<Link className='entryForm__link' to={linkTo}>{linkTitle}</Link></span>

            </form>
        </div>
    )
}

export default WithTranslation(EntryForm)