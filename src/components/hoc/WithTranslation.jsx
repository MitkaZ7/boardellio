import React from 'react';
import { useTranslation } from 'react-i18next';

const WithTranslation = (Component) => {
    return (props) => {
        const { t } = useTranslation();
        return <Component t={t} {...props} />;
    };
};

export default WithTranslation;
