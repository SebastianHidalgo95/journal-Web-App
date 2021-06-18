import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyADkEXPMXWqisohP_4HQOAiaSL43YzxqGM",
    authDomain: "react-journal-app-75a3b.firebaseapp.com",
    projectId: "react-journal-app-75a3b",
    storageBucket: "react-journal-app-75a3b.appspot.com",
    messagingSenderId: "853909554293",
    appId: "1:853909554293:web:9871109829e276e9af643c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }