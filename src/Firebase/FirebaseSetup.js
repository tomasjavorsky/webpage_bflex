import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCcxbzgyIaI64sMciu8DT1jZBfa3vjkzrQ",
  authDomain: "bflex-imgdb.firebaseapp.com",
  databaseURL: "https://bflex-imgdb.firebaseio.com",
  projectId: "bflex-imgdb",
  storageBucket: "bflex-imgdb.appspot.com",
  messagingSenderId: "268200793579",
  appId: "1:268200793579:web:875de7133bd3e058"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export{
  storage,
  firebase as default
};