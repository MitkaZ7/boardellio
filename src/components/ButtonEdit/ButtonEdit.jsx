import React from 'react'
import { useTranslation } from 'react-i18next'
import WithTranslation from '../hoc/WithTranslation';

const ButtonEdit = ({t}) => {

  return (
      <button className="button-edit">
          {t('edit')}
      </button>
  )
}

export default WithTranslation(ButtonEdit);