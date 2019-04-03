// import firebase from 'firebase';
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueFire)

 var config = {
    apiKey: "AIzaSyAaut80dcTKX3IqFWO8Poit47s9EdkBWvA",
    authDomain: "kung-fotboll.firebaseapp.com",
    databaseURL: "https://kung-fotboll.firebaseio.com",
    projectId: "kung-fotboll",
    storageBucket: "kung-fotboll.appspot.com",
    messagingSenderId: "195958907743"
};

 const fb = firebase.initializeApp(config);
 // const db = firebase.database();
 const db = firebase.firestore()

 export {db, fb}
