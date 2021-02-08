import firebase from 'firebase'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyBv9pfm4r1BG1gNoDpqVPB93YFbB7XPCp8",
  authDomain: "managerapp-5d08a.firebaseapp.com",
  databaseURL: "https://managerapp-5d08a.firebaseio.com",
  projectId: "managerapp-5d08a",
  storageBucket: "managerapp-5d08a.appspot.com",
  messagingSenderId: "894581046455",
  appId: "1:894581046455:web:5c5d2626801b63b0"
};

firebase.initializeApp(config);

const storage = firebase.storage()

export { storage, firebase as default }