const firebaseAdmin = require("./node_modules/firebase-admin");
const secrets = require("./secrets.json");
var fs = require("fs");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(secrets),
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
});

const data = require("./seed.json");

async function getCollectionIds() {
  const collections = await firebaseAdmin.firestore().listCollections();

  return collections.map((collection) => collection.id);
}

async function getCollectionData(collectionId) {
  const snapshot = await firebaseAdmin
    .firestore()
    .collection(collectionId)
    .get();
  const data = snapshot.docs.map((doc) => doc.data());

  return { [collectionId]: data };
}

async function resolve() {
  const collectionIds = await getCollectionIds();

  const promises = collectionIds.map((id) => {
    return getCollectionData(id);
  });

  Promise.all(promises).then((values) => {
    const json = JSON.stringify(values);
    fs.writeFile("seed.json", json, "utf8", (err) => {
      if (err) throw err;
      console.log("Export Done!");
    });
  });
}

resolve();
