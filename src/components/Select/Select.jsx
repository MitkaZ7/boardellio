import React, { useState } from 'react';

const Select = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onChange(value);
    };

    return (
        <select value={selectedOption} onChange={handleChange} className='select'>
            {options.map(option => (
                <option key={option} value={option} className='select__option'>{option}</option>
            ))}
        </select>
    );
};

export default Select;
