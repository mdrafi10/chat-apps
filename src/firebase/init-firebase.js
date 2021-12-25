const firebaseConfig = {
  apiKey: "AIzaSyCUu54jnm-iNbShFcS7EzFp-yrtTJZSn4o",
  authDomain: "chat-app-d5a43.firebaseapp.com",
  projectId: "chat-app-d5a43",
  storageBucket: "chat-app-d5a43.appspot.com",
  messagingSenderId: "251661023616",
  appId: "1:251661023616:web:fca32cd208c35b2c60a965",
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
