import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import EntryForm from '../EntryForm/EntryForm'
import { registrationSchema } from '../../utils/validation'
import { useTranslation } from 'react-i18next'

const Registration = () => {
  const { t } = useTranslation();

  return (
      <EntryForm
          buttonText={t('sign-up')}
          formTitle={t('sign-up')}
          linkText={t('already-registred')}
          linkTitle={t('log-in')}
          linkTo='/projects'
          isRegistration={true}
          validationSchema={registrationSchema}
      />   
      
  )
}

export default Registration