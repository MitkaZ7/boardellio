import React from 'react'

const ButtonAdd = ({buttonText, onClick}) => {
  return (
      <button className="button button_type_add" onClick={onClick}>
          {buttonText}
      </button>
  )
}

export default ButtonAdd