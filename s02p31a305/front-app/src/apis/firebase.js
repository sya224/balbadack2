import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD77aOSH1KXWGuUsZyUXXl0yZd4BFcNKYg",
    authDomain: "bbd1-39359.firebaseapp.com",
    databaseURL: "https://bbd1-39359.firebaseio.com",
    projectId: "bbd1-39359",
    storageBucket: "bbd1-39359.appspot.com",
    messagingSenderId: "308774794947",
    appId: "1:308774794947:web:88e47969bcf362bd501476"
}
firebase.initializeApp(config);
export default firebase