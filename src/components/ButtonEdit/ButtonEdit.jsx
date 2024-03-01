import React from 'react'
import { useTranslation } from 'react-i18next'

const ButtonEdit = () => {
const { t } = useTranslation();
  return (
      <button className="button-edit">
          {t('edit')}
      </button>
  )
}

export default ButtonEdit