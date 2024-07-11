import axios from 'axios';
import { jwtDecode } from 'jwt-decode';    

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
   
    params: {
        key: process.env.REACT_APP_API_KEY,
    }
})

class AuthApi {

    register(data){
        return instance.post('/accounts:signUp?', { ...data, returnSecureToken: true });
    }
    login(data){
        return instance.post('/accounts:signInWithPassword?', {...data, returnSecureToken: true})
    }
    // loginWithToken(token) { 
    //     const data = {
    //         'postBody': token,
    //         'requestUri': 'http://localhost'
    //     }
    //     return instance.post('/accounts:signInWithIdp?', { ...data, returnSecureToken: true });
    // }
    refreshToken(refreshToken) {
        return instance.post('/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
        });
    }
    checkToken(idToken) {
        try {
            const decodedToken = jwtDecode(idToken);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                console.log('Token expired')

                throw new Error('Token expired');
            }
            // console.log('token has been decoded: ', decodedToken)
            return decodedToken;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
    verifyIdToken(idToken) {
        try {
            const response = instance.post('/accounts:lookup', { idToken });
            if (response.data && response.data.users && response.data.users.length > 0) {
                console.log('Token is valid:', response.data.users[0]);
                return response.data.users[0];
            } else {
                throw new Error('Invalid token response');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error.message;
                console.error('Firebase error message:', errorMessage);
                throw new Error(errorMessage);
            } else {
                console.error('Error verifying ID token:', error);
                throw new Error('Unexpected error occurred while verifying token');
            }
        }
    }
    
   
}



const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const authApi = new AuthApi(instance);
export default authApi;

