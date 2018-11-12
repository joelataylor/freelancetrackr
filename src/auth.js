import firebase from "firebase";
import firebaseui from "firebaseui";
import { db } from "@/firebase";

const auth = {
  context: null,
  uiConfig: null,
  ui: null,
  business: null,

  init(context) {
    this.context = context;

    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            prompt: "select_account"
          }
        }
      ]
    };
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged(() => {
      this.context.$store.dispatch("user/setCurrentUser");
      if (!this.user()) {
        this.business = null;
        this.context.$store.dispatch("user/setCurrentBusiness", this.business);
        this.context.$router.push("auth");
      } else {
        this.getBusiness();
        this.context.$router.push("dashboard");
      }
    });
  },
  authForm(container) {
    this.ui.start(container, this.uiConfig);
  },
  user() {
    return this.context ? firebase.auth().currentUser : null;
  },
  getBusiness() {
    db.collection("accounts")
      .where("owner_id", "==", this.user().uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.business = doc.data();
          this.business.id = doc.id;
          this.context.$store.dispatch(
            "user/setCurrentBusiness",
            this.business
          );
        });
      })
      .catch(error => {
        console.log("Error getting a business: ", error);
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.context.$router.push("auth");
      });
  }
};

export default auth;
