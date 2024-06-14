import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
import { registrationSchema } from '../../utils/validation'
import WithTranslation from '../hoc/WithTranslation'
import Tooltip from '../Tooltip/Tooltip'
const Registration = ({t}) => {
  const registrationError = useSelector(state => state.user.error)
  const { isShown, message } = useSelector((state) => state.tooltip);

  return (
    <>
    
      {isShown && <Tooltip messageText={message} />}
    <EntryForm
      buttonText={t('sign-up')}
      formTitle={t('sign-up')}
      linkText={t('already-registred')}
      linkTitle={t('log-in')}
      linkTo='/login'
      isRegistration={true}
      validationSchema={registrationSchema}
    />
    </>

  )
}

export default WithTranslation(Registration)