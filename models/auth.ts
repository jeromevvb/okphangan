import facebookProvider from '../auth/providers/facebook';
import googleProvider from '../auth/providers/google';
import firebase from '@services/firebase'
import { createUser, UserLoginInfo, CreateUserResponse } from './user';


const loginWithSocial = async (providerName:'facebook' | 'google', userInfos:UserLoginInfo):Promise<CreateUserResponse> => {
  const provider =
      providerName === "facebook" ? facebookProvider : googleProvider;

    const resultSignIn = await firebase.auth().signInWithPopup(provider);

    return createUser(resultSignIn, userInfos);
  }

export default {loginWithSocial}