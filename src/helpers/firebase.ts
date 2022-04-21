
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyASApgQisAotyZr10cikAMYBBgOuqB2gCU",
    authDomain: "fir-upload-image-a79ce.firebaseapp.com",
    projectId: "fir-upload-image-a79ce",
    storageBucket: "fir-upload-image-a79ce.appspot.com",
    messagingSenderId: "964246640353",
    appId: "1:964246640353:web:12a8cbcc39d2a47b8a89a0",
    measurementId: "G-1N7CHC5QT6"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);