// errorTransformMiddleware.js

const errorTransformMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        if (action.payload instanceof Error) {
            // Тут вы можете внести изменения в текст ошибки по вашему усмотрению
            const transformedError = transformError(action.payload.message);
            // Заменяем оригинальный payload трансформированным с использованием rejectWithValue
            console.log(transformedError)
            return next(createRejectAction(action, transformedError));
        }
    }

    return next(action);
};

const transformError = (originalError) => {
    console.log('dd')
    // Ваш код для трансформации текста ошибки
    // Например, здесь вы можете обрезать текст, заменять символы и т.д.
    return originalError.slice(0, 20); // пример обрезки текста до первых 20 символов
};

const createRejectAction = (action, payload) => {
    return {
        ...action,
        payload,
        error: true,
    };
};

export default errorTransformMiddleware;
