import axios from 'axios';



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
    authorize(data){
        return instance.post('/accounts:signInWithPassword?', {...data, returnSecureToken: true})
    }
    updataProfile(data){
        console.log(data)
        return instance.post('/accounts:update?', data)
    
    }
    getUserData(idToken){
        return instance.get('/accounts:lookup?idToken='+idToken)
    
    }

    checkToken(token){
        return instance.post('/accounts:signInWithCustomToken?', token)
    }
   
}




const authApi = new AuthApi(instance);
export default authApi;

