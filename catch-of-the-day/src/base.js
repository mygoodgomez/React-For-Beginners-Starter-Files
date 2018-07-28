import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBaRS88t0B-8qdjxp66cFNdMvx1BbrUr3o",
    authDomain: "catch-of-the-day-nik.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-nik.firebaseio.com",
    projectId: "catch-of-the-day-nik",
    storageBucket: "catch-of-the-day-nik.appspot.com",
    messagingSenderId: "820243669341"

});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base