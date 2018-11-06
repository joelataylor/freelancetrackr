<template>
    <div v-if="user">
        <h1>Dashboard</h1>
        <img :src="user.photoURL" width="100"> <br>
        <h3>{{user.displayName}}</h3>
        <p>{{user.email}}</p>
        <button @click="logOut">Log out</button>
        <br><br><br>
        <h1>{{company}}</h1>
        <pre>
            {{user}}
        </pre>
    </div>
</template>

<script>
import auth from "@/auth";
import { firestore } from "@/firebase";

export default {
  name: "dashboard",
  data: function() {
    return {
      company: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    logOut() {
      auth.logout();
    }
  },
  mounted() {
    const account = firestore.collection("accounts")
      .where("owner_id", "==", this.user.uid).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id}`);
          console.log(doc.data());
          this.company = doc.business_name;
        });
      });
  }
};
</script>

<style>
img {
  border-radius: 50px;
}
h3 {
  margin-bottom: 0;
}
p {
  margin-top: 0;
}
pre {
  display: none;
}
</style>
