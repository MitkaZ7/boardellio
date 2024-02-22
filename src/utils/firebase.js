import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
export const notDeletedProjecTasks = {
  structuredQuery: {
    from: [
      { collectionId: "tasks" }
    ],
    where: {
      compositeFilter: {
        op: 'AND',
        filters: [
          {
            fieldFilter: {
              field: { fieldPath: 'projectId' },
              op: 'EQUAL',
              value: {
                stringValue: projectId
              }
            }
          },
          {
            fieldFilter: {
              field: { fieldPath: 'deleted' },
              op: 'EQUAL',
              value: { booleanValue: false }
            }
          }
        ]
      }


    }
  }
};