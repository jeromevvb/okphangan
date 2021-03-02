import facebookProvider from '../auth/providers/facebook';
import googleProvider from '../auth/providers/google';
import firebase from '@services/firebase'
import { createUser, UserLoginInfo, CreateUserResponse, UserModel } from './user';


const loginWithSocial = async (providerName:'facebook' | 'google', userInfos:UserLoginInfo):Promise<UserModel> => {
  const provider =
      providerName === "facebook" ? facebookProvider : googleProvider;

    const resultSignIn = await firebase.auth().signInWithPopup(provider)

    const user = await createUser(resultSignIn, userInfos);

    return user;
  }

export default {loginWithSocial}