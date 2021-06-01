import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHKamN7E_oaCw4uwEJeR4dDXwHyrUJ1w4',
  authDomain: 'board-176dc.firebaseapp.com',
  projectId: 'board-176dc',
  storageBucket: 'board-176dc.appspot.com',
  messagingSenderId: '306952014877',
  appId: '1:306952014877:web:42511567092f2baf238af4',
  measurementId: 'G-SHGDKQH8MB',
};
firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();
