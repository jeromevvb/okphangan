import firebase from '@services/firebase'
import { createBusiness } from './business';

export type UserModel = {
  uid:string,
  displayName:string
  email:string
  photoURL:string, 
  onboarded:boolean,
  createdAt:firebase.firestore.Timestamp,
  role:'member' | 'business',
  subscription : {
    plan:'free' | 'starter' | 'premium',
    startAt:firebase.firestore.Timestamp,
  }
  locale:'en' | 'th',
    //if user has a business
  business : {
    id:string
    name:string,
    slug:string
  } | null,
}

export type UserLoginInfo = {
  role:string | 'member' | 'business',
  locale:string
}

export type CreateUserResponse = {isNewUser:boolean, isOnboarded:boolean};


/**
 * 
 * @param userCredentials 
 * @param newUserInfo 
 */
const createUser = async (userCredentials:firebase.auth.UserCredential, newUserInfo:UserLoginInfo):Promise<UserModel & {isNewUser:boolean}> => {

    const isNewUser = userCredentials.additionalUserInfo?.isNewUser || false;
    const isOnboarded = newUserInfo.role === 'business' ? false : true;
    const uid = userCredentials.user?.uid as string

    // create new user
    if (isNewUser) {
      const userModel = {
        ...newUserInfo,
        // firstName:resultSignIn.additionalUserInfo?.profile?.first_name,
        // lastName:resultSignIn.additionalUserInfo?.profile?.last_name,
        displayName:userCredentials.user?.displayName,
        email:userCredentials.user?.email,
        photoURL:userCredentials.user?.photoURL, 
        onboarded:isOnboarded,
        createdAt:firebase.firestore.Timestamp.now(),
        business:null,
        subscription:{
          plan:'free', 
          createdAt:firebase.firestore.Timestamp.now(),
        }, 
        uid,
      }

      // pre create business if user needs to be onboarded
      if(isOnboarded === false){
       const businessId = await createBusiness(uid as string);

        await firebase.firestore().collection("users").doc(uid).set(
          {
            ...userModel, 
            business:{
              id:businessId,
              name:'', 
              slug:'' 
            }
          }
      );

      }else{
        await firebase.firestore().collection("users").doc(uid).set({...userModel});
      }
    } 

    const user = await getUser(uid);

    return {...user, isNewUser};
  }

/**
 * 
 * @param user 
 */
const onboardUser = async (user:UserModel, business:{slug:string, id:string, name:string}):Promise<UserModel> => {
   await firebase.firestore().collection('users').doc(user.uid).update({onboarded:true, business});

   const updatedUser = await getUser(user.uid);
   
   return updatedUser;
}

/**
 * 
 * @param userId 
 */
const getUser = async(userId:string):Promise<UserModel> => {

  const requestUser = firebase
        .firestore()
        .collection("users")
        .doc(userId);
       
  const response = await requestUser.get();
  const data = response.data();

  return data as UserModel;
}

export {createUser, onboardUser, getUser};