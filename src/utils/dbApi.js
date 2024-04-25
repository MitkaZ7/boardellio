import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: process.env.REACT_APP_API_KEY,
    }
});

class AuthApi {
    async register(data) {
        try {
            const response = await instance.post('/accounts:signUp?', data);
            const { localId } = response.data;

            // Создаем запись в базе данных Firebase для нового пользователя
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            console.log(user)
            // Задайте значения по умолчанию для displayName и photoUrl
            await user.updateProfile({
                displayName: "Perry",
                photoUrl: "https://dummyimage.com/150/b8b8b8/fff",
            });

            const db = getDatabase();
            const userRef = ref(db, `users/${localId}`);
            await set(userRef, {
                email: data.email,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    async authorize(data) {
        try {
            const response = await instance.post('/accounts:signInWithPassword?', data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // ... остальные методы ...
}

const authApi = new AuthApi(instance);
export default authApi;