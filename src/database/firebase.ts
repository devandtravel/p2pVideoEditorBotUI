import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC8J2oaokY2MRBCkt2gWkINkUMTMh77QTw',
  authDomain: 'video-editor-bot.firebaseapp.com',
  projectId: 'video-editor-bot',
  storageBucket: 'video-editor-bot.appspot.com',
  messagingSenderId: '644157584872',
  appId: '1:644157584872:web:b505387d5df02dd958e05d',
  measurementId: 'G-L3TBRCSK9M'
}

const firebase = initializeApp(firebaseConfig)

export const firestore = getFirestore(firebase)
