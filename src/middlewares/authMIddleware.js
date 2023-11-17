const authMiddleware = (store) => (next) => (action) => {
    if (authActions.login.match(action)) {
        // Note: localStorage expects a string
        localStorage.setItem('isAuthenticated', 'true');
    } else if (authActions.logout.match(action)) {
        localStorage.setItem('isAuthenticated', 'false');
    }
    return next(action);
};