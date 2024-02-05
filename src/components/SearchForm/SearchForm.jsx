import React from 'react'

const SearchForm = ({labelText}) => {
  return (
    <search className='search-form-container search-form'>
        <label className='search-form__label'>
            {labelText}
            <input className='search-from__input' type='search' id='query'/>
        </label>
      <div className='search-form__results-container'>
        <ul className='search-form__results-list'>
          <li>first res</li>
          <li>sec res</li>
          <li>thrererer res</li>
          <li>fourrrr redddds</li>
          <li>five five resfr2</li>
          <li>another fuckin hproject res</li>
          <li>again fkc int  res</li>

        </ul>
        <output id="no-results">
          <p>no results</p>
        </output>
      </div>
    </search>
  )
}

export default SearchForm