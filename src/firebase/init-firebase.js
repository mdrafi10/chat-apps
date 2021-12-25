const firebaseConfig = {
  apiKey: "AIzaSyDsttjSHcu2aQnGu3lnciJBfNJwpwsePQo",
  authDomain: "chat-apps-df9f8.firebaseapp.com",
  projectId: "chat-apps-df9f8",
  storageBucket: "chat-apps-df9f8.appspot.com",
  messagingSenderId: "842606909948",
  appId: "1:842606909948:web:3962c40542317bd5dc7a79"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// make auth and firestore references
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

// update firestore settings
// db.settings({ timestampsInSnapshots: true });
db.settings({ merge: true });
