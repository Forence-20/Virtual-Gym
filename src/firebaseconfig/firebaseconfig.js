import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBxondINktOxiU120pjhrpuk5137bOQQsg',
  authDomain: 'grammarbot-3c554.firebaseapp.com',
  databaseURL: 'https://grammarbot-3c554-default-rtdb.firebaseio.com',
  projectId: 'grammarbot-3c554',
  storageBucket: 'grammarbot-3c554.appspot.com',
  messagingSenderId: '1054038488792',
  appId: '1:1054038488792:web:2583ec48a23fd49bb649ad',
  measurementId: 'G-6LQJ0XXQM0',
});

export const auth = app.auth();
export const fstore = app.firestore();
export default app;
