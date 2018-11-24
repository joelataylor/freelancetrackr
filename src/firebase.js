import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

import config from './config/firebase-config'

firebase.initializeApp(config)

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

export { db }
