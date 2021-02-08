import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyDrASwiPU_HhR2B-EgJPQK6sC2wRTPYZGE',
  authDomain: 'jing-note-e93f3.firebaseapp.com',
  projectId: 'jing-note-e93f3',
  storageBucket: 'jing-note-e93f3.appspot.com',
  messagingSenderId: '632792711831',
  appId: '1:632792711831:web:4c4137224a4a59c17b9fd2',
});

export const notesRef = firebase.firestore().collection('/notes');
