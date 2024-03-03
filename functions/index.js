/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.firestore
    .document(`products/{productId}`)
    .onCreate((event) => {
      const docId = event.params.productId;
      const name = event.data.data().name;
      const productRef = admin.firestore().collection("products").doc(docId);
      console.log(productRef);
      return productRef
          .update({message: `Nice ${name}! - Love Cloud Functions`});
    });
