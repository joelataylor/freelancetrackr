import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import VueFirestore from 'vue-firestore'

import config from './config/firebase-config'

firebase.initializeApp(config)

Vue.use(VueFirestore)

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

// Initialize Cloud Functions through Firebase
const functions = firebase.functions()

export { firestore, functions }
