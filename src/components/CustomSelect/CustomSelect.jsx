import React, { useState } from 'react';

const Select = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onChange(value);
    };

    return (
        
        <div className='custom-select'>
            <select value={selectedOption} onChange={handleChange} className='custom-select__select'>
                {options.map(option => (
                    <option key={option.value} value={option.value} className='custom-select__option'>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
