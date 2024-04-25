import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore,doc,setDoc } from 'firebase/firestore';  



const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: process.env.REACT_APP_API_KEY,
    }
})

class AuthApi {
    register(data) {
      try {
        const res = instance.post('/accounts:signUp?', data);
        const { localId } = res.data;

        
      } catch (error) {
        
      }
    }
    // register(data){
    //     return instance.post('/accounts:signUp?',data);
    // }
    authorize(data){
        return instance.post('/accounts:signInWithPassword?', data)
    }
    updataProfile(data){
        console.log(data)
        return instance.post('/accounts:update?', data)
    
    }

    checkToken(token){
        return instance.post('/accounts:signInWithCustomToken?', token)
    }
   
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

