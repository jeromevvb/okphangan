import firebase from '../../services/firebase';

const provider = new firebase.auth.FacebookAuthProvider();

provider.addScope('email');
provider.addScope('public_profile');

export default provider;