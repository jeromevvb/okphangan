import firebase from '@services/firebase'

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
const createUser = async (userCredentials:firebase.auth.UserCredential, newUserInfo:UserLoginInfo):Promise<CreateUserResponse> => {

    const isNewUser = userCredentials.additionalUserInfo?.isNewUser || false;
    const isOnboarded = newUserInfo.role === 'business' ? false : true;

    // create new user
    if (isNewUser) {
      const uid = userCredentials.user?.uid;

      const userModel = {
        ...newUserInfo,
        // firstName:resultSignIn.additionalUserInfo?.profile?.first_name,
        // lastName:resultSignIn.additionalUserInfo?.profile?.last_name,
        displayName:userCredentials.user?.displayName,
        email:userCredentials.user?.email,
        photoURL:userCredentials.user?.photoURL, 
        onboarded:isOnboarded,
        createdAt:firebase.firestore.Timestamp.now(),
        subscription:{
          plan:'free', 
          createdAt:firebase.firestore.Timestamp.now(),
        }, 
        uid,
      }

      // pre create business if user needs to be onboarded
      if(isOnboarded === false){
        const createBusinessRequest = await firebase.firestore().collection("businesses").add(
        {
          userId:uid,
           createdAt:firebase.firestore.Timestamp.now()
        });

        await firebase.firestore().collection("users").doc(uid).set({...userModel, businessId:createBusinessRequest.id});
      }else{
        await firebase.firestore().collection("users").doc(uid).set({...userModel});
      }
    } 

    return {isOnboarded, isNewUser};
  }

/**
 * 
 * @param user 
 */
const onboardUser = async (user:UserModel):Promise<void> => {
   return firebase.firestore().collection('users').doc(user.uid).update({onboarded:true});
}

  export {createUser, onboardUser};