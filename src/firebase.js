import firebase from 'firebase';
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyCAgXK20Nw4KDZbV4tyWFnF8f8TcqmtbqA",
    authDomain: "react-todo-9eab5.firebaseapp.com",
    databaseURL: "https://react-todo-9eab5.firebaseio.com",
    projectId: "react-todo-9eab5",
    storageBucket: "react-todo-9eab5.appspot.com",
    messagingSenderId: "285468235389"
};

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
})

export default db  ;