const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDPBTQQPSTCXEOPAODnm5nzODM7k3G-tJs',
  authDomain: 'aruna-portfolio-663fd.firebaseapp.com',
  projectId: 'aruna-portfolio-663fd',
  storageBucket: 'aruna-portfolio-663fd.firebasestorage.app',
  messagingSenderId: '1097241280800',
  appId: '1:1097241280800:web:d259c7304f5e71ba2b1f86'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateAvatar() {
  const docRef = doc(db, 'profiles', 'default');
  const d = await getDoc(docRef);
  if (d.exists()) {
    const data = d.data();
    const updatedPersonalInfo = {
      ...data.personalInfo,
      avatarUrl: '/Profile_Picture.png'
    };
    await updateDoc(docRef, { personalInfo: updatedPersonalInfo });
    console.log('Successfully updated personalInfo.avatarUrl in Firestore!');
  } else {
    console.error('Document profiles/default does not exist.');
  }
}

updateAvatar()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error updating avatar:', err);
    process.exit(1);
  });
