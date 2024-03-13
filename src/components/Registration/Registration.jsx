import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
import { registrationSchema } from '../../utils/validation'
import WithTranslation from '../hoc/WithTranslation'
const Registration = ({t}) => {


  return (
    <EntryForm
      buttonText={t('sign-up')}
      formTitle={t('sign-up')}
      linkText={t('already-registred')}
      linkTitle={t('log-in')}
      linkTo='/login'
      isRegistration={true}
      validationSchema={registrationSchema}
    />

  )
}

export default WithTranslation(Registration)