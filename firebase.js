import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

export const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

