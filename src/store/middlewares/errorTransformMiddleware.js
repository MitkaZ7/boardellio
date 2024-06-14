const transformError = (originalError) => {
    return originalError.slice(0, 20);
};

const createRejectAction = (action, payload) => {
    return {
        ...action,
        payload,
        error: true,
    };
};


const errorTransformMiddleware = () => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        if (action.payload instanceof Error) {
            const transformedError = transformError(action.payload.message);
            console.log('sss')
            return next(createRejectAction(action, transformedError));
        }
    }

    return next(action);
};


export default errorTransformMiddleware;
