import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyCFSbqwJ5oCW_RjaZbMZurQFdfaTKINs0w",
	authDomain: "jtech-mailer-eccea.firebaseapp.com",
	databaseURL: "https://jtech-mailer-eccea-default-rtdb.firebaseio.com",
	projectId: "jtech-mailer-eccea",
	storageBucket: "jtech-mailer-eccea.firebasestorage.app",
	messagingSenderId: "921339640817",
	appId: "1:921339640817:web:8788fb3d8d335127a4e250"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbRef = getDatabase(app);