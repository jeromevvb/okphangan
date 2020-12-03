import firebase from "firebase/app";


const provider = new firebase.auth.FacebookAuthProvider();

provider.addScope('email');
provider.addScope('public_profile');

export default provider;