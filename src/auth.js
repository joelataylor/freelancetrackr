import firebase from 'firebase'
import { db } from '@/firebase'

const auth = {
  context: null,

  init(context) {
    this.context = context

    // firebase.auth().onAuthStateChanged(() => {
    //   this.context.$store.dispatch('user/setCurrentUser')
    //   if (!this.user()) {
    //     this.business = null
    //     this.context.$store.dispatch('user/setCurrentBusiness', this.business)
    //     // this.context.$router.push('auth')
    //   } else {
    //     // this.getBusiness()
    //     // this.context.$router.push('dashboard')
    //   }
    // })
  },

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe()
        this.context.$store.dispatch('user/setCurrentUser', user)
        resolve(user)
      }, reject)
    })
  },

  // user() {
  //   console.log('Auth context: ', this.context)
  //   return firebase.auth().currentUser
  // },

  getBusiness(user) {
    return db
      .collection('accounts')
      .where('owner_id', '==', user.uid)
      .get()
      .then(querySnapshot => {
        let business
        querySnapshot.forEach(doc => {
          business = doc.data()
          business.id = doc.id
          console.log('BUSI: ', business)
          this.context.$store.dispatch('user/setCurrentBusiness', business)
        })
        return business
      })
      .catch(error => {
        console.log('Error getting a business: ', error)
      })
  },

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.context.$router.push('signin')
      })
  }
}

export default auth
