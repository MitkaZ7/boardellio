import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LangSelect = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState('');

  const changeLanguage = (language) => {
    setSelectedLang(language);
    localStorage.setItem('i18nextLng', language);
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    setSelectedLang(savedLanguage);
  }, []);

  return (
    <select
      value={selectedLang}
      className='langSelect'
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="ru" className="langSelect__lang">ru</option>
      <option value="en" className="langSelect__lang">en</option>
      <option value="zh" className="langSelect__lang">zh</option>
    </select>
  );
};

export default LangSelect;
