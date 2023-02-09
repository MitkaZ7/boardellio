import Parse from 'parse/dist/parse.min.js';

const dbConfig = {
   PARSE_APPLICATION_ID : process.env.REACT_APP_PARSE_APP_ID,
   PARSE_HOST_URL : process.env.REACT_APP_PARSE_HOST_URL,
   PARSE_JAVASCRIPT_KEY : process.env.REACT_APP_PARSE_JS_KEY,
   REST_API_KEY: process.env.REACT_APP_PARSE_API_KEY,
};


export const parseDb = Parse.initialize(dbConfig.PARSE_APPLICATION_ID, dbConfig.PARSE_JAVASCRIPT_KEY );

Parse.serverURL = dbConfig.PARSE_HOST_URL;