<template>
    <div v-if="user">
        <h1>Dashboard</h1>
        <img :src="user.photoURL" width="100"> <br>
        <h3>{{user.displayName}}</h3>
        <p>{{user.email}}</p>
        <button @click="logOut">Log out</button>
        <br><br><br>
        <pre>
            {{user}}
        </pre>

        <div v-if="business">
          <h1>{{business.business_name}}</h1>
        </div>
        <div v-else>
          <h1>Looks like you need to create a business</h1>
          <input name="business_name" v-model="new_business_name">
          <button @click="createNewBusiness">Create new business</button>
          <p class="alert">{{error}}</p>
        </div>
    </div>
</template>

<script>
import auth from "@/auth";
import { db } from "@/firebase";

export default {
  name: "dashboard",
  data: function() {
    return {
      new_business_name: null,
      error: null
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    business() {
      return this.$store.getters["user/business"];
    }
  },
  methods: {
    createNewBusiness() {
      let biz_name = this.new_business_name
        .trim()
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/([^a-zA-Z0-9\._-]+)/, "");

      console.log("NEW BIZ: ", biz_name);
      const ref = db.collection("accounts").doc(biz_name);
      ref.get().then(docSnapshot => {
        if (docSnapshot.exists) {
          // Error due to Business name collision
          this.error = `Sorry, ${biz_name} already exists. Try another`;
        } else {
          // Create new Business entry
          const business = {
            business_name: this.new_business_name,
            owner_id: auth.user().uid
          };

          db.collection("accounts")
            .doc(biz_name)
            .set(business)
            .then(() => {
              this.$store.dispatch("user/setCurrentBusiness", business);
            })
            .catch(error => {
              console.log(
                "Oops, we had an error creating a new business: ",
                error
              );
            });
        }
      });
    },
    logOut() {
      auth.logout();
    }
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
