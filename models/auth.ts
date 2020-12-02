import firebase from "@services/firebase";
import facebookProvider from '../auth/providers/facebook';
import googleProvider from '../auth/providers/google';

type NewUserModel = {
  role:string | 'member' | 'business',
  locale:string
}

const loginWithSocial = async (providerName:'facebook' | 'google', newUserModel:NewUserModel):Promise<firebase.auth.UserCredential> => {
  const provider =
      providerName === "facebook" ? facebookProvider : googleProvider;

    const resultSignIn = await firebase.auth().signInWithPopup(provider);

    // create new user
    if (resultSignIn.additionalUserInfo?.isNewUser) {
      const uid = resultSignIn.user?.uid;

      const userModel = {
        ...newUserModel,
        displayName:resultSignIn.user?.displayName,
        email:resultSignIn.user?.email,
        photoURL:resultSignIn.user?.photoURL, 
        onboarded:false,
        startAt:firebase.firestore.Timestamp.now()
      }

      firebase.firestore().collection("users").doc(uid).set(userModel);
    }

    return resultSignIn;
  }

export default {loginWithSocial}