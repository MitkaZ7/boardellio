import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIND_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//queries
// export const notDeletedProjecTasks = {
//   structuredQuery: {
//     from: [
//       { collectionId: "tasks" }
//     ],
//     where: {
//       compositeFilter: {
//         op: 'AND',
//         filters: [
//           {
//             fieldFilter: {
//               field: { fieldPath: 'projectId' },
//               op: 'EQUAL',
//               value: {
//                 stringValue: projectId
//               }
//             }
//           },
//           {
//             fieldFilter: {
//               field: { fieldPath: 'deleted' },
//               op: 'EQUAL',
//               value: { booleanValue: false }
//             }
//           }
//         ]
//       }


//     }
//   }
// };

// export const getUserDataFromToken = async (token) => {
//   try {
//     const auth = getAuth();
//     await signInWithCustomToken(auth, token);
//     const user = auth.currentUser;
//     return {
//       email: user.email,
//       name: user.displayName,
//       role: 'user',
//       avatar: user.photoURL || 'https://dummyimage.com/150/b8b8b8/fff'
//     }
//   } catch (error) {
//     console.error('Ошибка при получении данных пользователя из токена')
//   }
// }