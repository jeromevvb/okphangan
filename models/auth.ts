import facebookProvider from '../auth/providers/facebook';
import googleProvider from '../auth/providers/google';

import firebase from "firebase/app";

export type UserModel = {
  displayName:string
  email:string
  photoURL:string, 
  onboarded:boolean,
  createdAt:firebase.firestore.Timestamp,
  role:'member' | 'business',
  locale:'en' | 'th',
  uid:string
}

type NewUserInfo = {
  role:string | 'member' | 'business',
  locale:string
}

const loginWithSocial = async (providerName:'facebook' | 'google', newUserInfo:NewUserInfo):Promise<firebase.auth.UserCredential> => {
  const provider =
      providerName === "facebook" ? facebookProvider : googleProvider;

    const resultSignIn = await firebase.auth().signInWithPopup(provider);

    // create new user
    if (resultSignIn.additionalUserInfo?.isNewUser) {
      const uid = resultSignIn.user?.uid;

      const userModel = {
        ...newUserInfo,
        displayName:resultSignIn.user?.displayName,
        email:resultSignIn.user?.email,
        photoURL:resultSignIn.user?.photoURL, 
        onboarded:false,
        createdAt:firebase.firestore.Timestamp.now(),
        uid,
      }

      firebase.firestore().collection("users").doc(uid).set(userModel);
    }

    return resultSignIn;
  }

export default {loginWithSocial}