
const rejectionMiddleware = () => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        // console.log('Async action failed with error:', action.error);
    }
    return next(action);
};

export default rejectionMiddleware;