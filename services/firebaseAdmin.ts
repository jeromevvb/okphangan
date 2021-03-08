import firebaseAdmin from 'firebase-admin';
// import serviceAccount from '../secrets.json';

// const params = {
//   type: serviceAccount.type,
//   projectId: serviceAccount.project_id,
//   privateKeyId: serviceAccount.private_key_id,
//   privateKey: serviceAccount.private_key,
//   clientEmail: serviceAccount.client_email,
//   clientId: serviceAccount.client_id,
//   authUri: serviceAccount.auth_uri,
//   tokenUri: serviceAccount.token_uri,
//   authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
//   clientC509CertUrl: serviceAccount.client_x509_cert_url
// }
   



// if(!firebaseAdmin.apps.length) {
//   firebaseAdmin.initializeApp({
//     credential:firebaseAdmin.credential.cert(params),
//     databaseURL:process.env.NEXT_PUBLIC_DATABASE_URL
//   })
// }


// export const verifyIdToken = (token:string) => {
//   //TODO: catch error
//   return firebaseAdmin.auth().verifyIdToken(token);
// }

export default firebaseAdmin;