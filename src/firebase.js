import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import config from "./config/firebase-config";

firebase.initializeApp(config);

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export { firestore };
