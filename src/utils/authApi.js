import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: process.env.REACT_APP_API_KEY,
    }
})

class AuthApi {
    checkResponse(res) {
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }
   
    register(data){
        return instance.post('/accounts:signUp?', { ...data, returnSecureToken: true });
    }
    authorize(data){
        return instance.post('/accounts:signInWithPassword?', {...data, returnSecureToken: true})
    }
    refreshToken(refreshToken) {
        console.log(refreshToken)
        return instance.post('/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
        });
    }
    updateProfile(data){
        console.log(data)
        return instance.post('/accounts:update?', data)
    
    }
    getUserById(uid) {
        return instance.get('/accounts:lookup?localId=' + uid);
    }
    getUserData(idToken){
        return instance.get('/accounts:lookup?idToken='+idToken)
    
    }
    checkToken(idToken) {
        return instance.get('/accounts:lookup?idToken=' + idToken)
            .then(res => res.data)
            .catch(err => {
                console.log('ошибка проверки токена ', err) 
                throw err
            
            });
    
    }
    // checkToken(idToken) {
    //     const response = instance.get('/accounts:lookup', {
    //         params: {
    //             idToken,
    //         },
    //     });

    //     if (response.data.error) {
    //         throw new Error(response.data.error.message);
    //     }
    //     console.log(response.data.users[0]);
    //     return response.data.users[0];
    // }
    // checkToken(token){
    //     return instance.get('/accounts:lookup?idToken=' + token)
    //         // .then(checkResponse).then(res => console.log(res));
    // }
   
}



const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const authApi = new AuthApi(instance);
export default authApi;

