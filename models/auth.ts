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
  //if user has a business
  businessId:string, 
  subscription : {
    plan:'free' | 'starter' | 'premium',
    startAt:firebase.firestore.Timestamp,
  }
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
        // firstName:resultSignIn.additionalUserInfo?.profile?.first_name,
        // lastName:resultSignIn.additionalUserInfo?.profile?.last_name,
        displayName:resultSignIn.user?.displayName,
        email:resultSignIn.user?.email,
        photoURL:resultSignIn.user?.photoURL, 
        onboarded:false,
        createdAt:firebase.firestore.Timestamp.now(),
        subscription:{
          plan:'free', 
          createdAt:firebase.firestore.Timestamp.now(),
        },
        uid,
      }

      // pre create business if user is business role
      if(userModel.role === 'business'){
        const createBusinessRequest = await firebase.firestore().collection("businesses").add(
        {
          userId:uid,
           createdAt:firebase.firestore.Timestamp.now()
        });
        const businessId = createBusinessRequest.id;
        firebase.firestore().collection("users").doc(uid).set({userModel, businessId});
      }else{
        firebase.firestore().collection("users").doc(uid).set({userModel});
      }

    } 

    return resultSignIn;
  }

export default {loginWithSocial}