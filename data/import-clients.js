var admin = require('firebase-admin')
var serviceAccount = require('./prod-keys.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://test-ft-data-import.firebaseio.com'
  databaseURL: 'https://freelancetrackr.firebaseio.com'
})

const data = require('./clients.json')

data &&
  Object.keys(data).forEach(key => {
    const client = data[key]
    // console.log(client)

    admin
      .firestore()
      .collection('accounts')
      .doc('windfarmstudios')
      .collection('clients')
      .doc()
      .set(client)
      .then(res => {
        console.log('Document successfully written!')
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })
  })
