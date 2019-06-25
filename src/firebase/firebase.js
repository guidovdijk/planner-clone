import firebase from 'firebase';
import 'firebase/firestore';

const config = {
	apiKey: "AIzaSyDaLr0Iy-tDZWOcXEiQYoFTzbwUbpc6ZOg",
	authDomain: "planner-37da1.firebaseapp.com",
	databaseURL: "https://planner-37da1.firebaseio.com",
	projectId: "planner-37da1",
	storageBucket: "planner-37da1.appspot.com",
	messagingSenderId: "80731919016",
	appId: "1:80731919016:web:b17fe442e0c545af",
}

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();