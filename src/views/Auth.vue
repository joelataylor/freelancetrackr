<template>
    <div>
        <h1>Sign in</h1>
        <div id="firebase-auth-container"></div>
    </div>
</template>

<script>
import auth from "@/auth";

export default {
  name: "auth",
  mounted() {
    auth.authForm("#firebase-auth-container");
  }
};
</script>

<style>
@import "../../node_modules/firebaseui/dist/firebaseui.css";
</style>
