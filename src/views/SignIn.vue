<template>
  <div>
    <Header title="Sign In" />
    
    <div class="py-10 text-center">
            
      <div class="flex">
        <div class="w-full p-4 tracking-wider">
          <div id="firebase-auth-container"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Header from '@/components/Header'

let ui = new firebaseui.auth.AuthUI(firebase.auth())

let uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/dashboard',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: 'select_account'
      }
    }
  ]
}

export default {
  name: 'Signin',

  mounted() {
    ui.start('#firebase-auth-container', uiConfig)
  },

  components: {
    Header
  }
}
</script>

<style>
@import '../../node_modules/firebaseui/dist/firebaseui.css';

.firebaseui-container {
  max-width: 100%;
  width: 30rem;
}
.firebaseui-idp-button {
  padding: 2rem;
  max-width: 100%;
}
.firebaseui-idp-button:hover {
  background-color: config('colors.grey-lighter');
}
</style>
