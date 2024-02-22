document.addEventListener('DOMContentLoaded', () => {
  const app = firebase.app();
  console.log(app);

  const db = firebase.firestore();

  const post = db.collection('posts').doc('firstpost');
  post.onSnapshot(
    doc => {
      console.log('zdes')
      const data = doc.data();
      document.querySelector('#title').innerHTML = data.title;
    })

  const productsRef = db.collection('products');
  const query = productsRef.where('price', '>', 10).orderBy('price', 'desc');
  query.get()
    .then(products => {
      products.forEach(doc => {
        const data = doc.data();
        document.querySelector('#products').innerHTML += `${data.name} at $${data.price}<br>`;
      })
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

const updatePost = (event) => {
  const db = firebase.firestore();
  const post = db.collection('posts').doc('firstpost');
  post.update({ title: event.target.value });
}

const uploadFile = (files) => {
  const file = files.item(0);

  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(file.name);

  const task = fileRef.put(file);
  task.then(snapshot => {
    console.log(snapshot);
    const url = snapshot.downloadURL;
    document.querySelector('#imgUpload').setAttribute('src', url);
  })
}
