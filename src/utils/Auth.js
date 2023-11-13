// const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.REACT_APP_API_KEY}`

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

// export const authorize = ({ password, email }) => {
//   return fetch(`${url}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     // .then((data) => {
//     //   console.log(data);
//     //   if (data.token) {
//     //     localStorage.setItem('token', data.token)
//     //     return data;
//     //   }
//     // })
//     // .catch((err) => console.log(err));
// };

// export const checkToken = (token) => {
//   return fetch(`${url}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// };
