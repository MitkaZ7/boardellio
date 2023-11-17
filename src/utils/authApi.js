import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: process.env.REACT_APP_API_KEY,
    }
})

class AuthApi {
    register(data){
        return instance.post('/accounts:signUp?',data);
    }
    authorize(data){
        return instance.post('/accounts:signInWithPassword?', data)
    }

    checkToken(token){
        return instance.post('/accounts:signInWithCustomToken?', token)
    }
    // getUserInfo(){
    //     return instance.get
    // }

    // checkToken(token){
    //     return fetch(`${url}/users/me`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         },
    //     }).then(checkResponse);
    // };
}


// const checkResponse = (res) =>
//   res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

// export const register = (email, password) => {
//   return fetch(`${url}/registration`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password })
//   }).then(checkResponse);
// };



const authApi = new AuthApi(instance);
export default authApi;

