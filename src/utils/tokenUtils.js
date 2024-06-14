export const saveTokens = (tokens) => {
    localStorage.setItem('jwt', JSON.stringify(tokens));
};

export const getTokens = () => {
    return JSON.parse(localStorage.getItem('jwt') || '{}');
};

export const clearTokens = () => {
    localStorage.removeItem('jwt');
};
