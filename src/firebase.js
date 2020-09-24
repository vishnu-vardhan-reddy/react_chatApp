import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDI9fITEME9sPkoOQO2gdQr5pgLQUbbJ_o",
    authDomain: "whats-app-clone-c2d38.firebaseapp.com",
    databaseURL: "https://whats-app-clone-c2d38.firebaseio.com",
    projectId: "whats-app-clone-c2d38",
    storageBucket: "whats-app-clone-c2d38.appspot.com",
    messagingSenderId: "374471468704",
    appId: "1:374471468704:web:352ce600a8aec47cc8cbc5",
    measurementId: "G-4NV5M4G6YB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export default db;
  export {auth , provider};