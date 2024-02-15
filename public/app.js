document.addEventListener('DOMContentLoaded', () => {
  const app = firebase.app();
  console.log(app);

  const db = firebase.firestore();

  const post = db.collection('posts').doc('firstpost');
  post.onSnapshot(
    doc => {
      console.log('zdes')
      const data = doc.data();
      document.write(`${data.title}<br>${data.views}`);
    })
});

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
      console.log(user);
    })
    .catch(console.log);
}
