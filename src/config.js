import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyC4RG4xgHyrsrgvS7HGh-vXNWdyPO70Mt0',
      authDomain: 'redsocialkafka.firebaseapp.com',
      projectId: 'redsocialkafka',
      storageBucket: 'redsocialkafka.appspot.com',
      messagingSenderId: '868126810471',
      appId: '1:868126810471:web:5390ee16d3d149123a4fc2',
    })
  : firebase.app()

export const storage = firebase.storage()
export const firestore = firebase.firestore()
export const auth = firebase.auth()

export const timestamp = firebase.firestore.FieldValue.serverTimestamp

export default app
