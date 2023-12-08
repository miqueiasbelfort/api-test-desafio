require("dotenv").config();
const {initializeApp} = require("firebase/app");
const {getFirestore} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {
  app,
  db
}