// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore correctly
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDzKpWw6lgHXSJMjxY2CHA2TJQjFFJcGU8',
  authDomain: 'mobile-app-88bf7.firebaseapp.com',
  projectId: 'mobile-app-88bf7',
  storageBucket: 'mobile-app-88bf7.appspot.com',
  messagingSenderId: '983519740330',
  appId: '1:983519740330:web:968e935f623afc7fe02bd3',
  measurementId: 'G-8F5V433NYF'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestore = getFirestore(app);

export { auth, firestore };
