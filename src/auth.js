import firebase from "firebase";
import firebaseui from "firebaseui";

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

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
        this.context.$router.push("auth");
      } else {
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
