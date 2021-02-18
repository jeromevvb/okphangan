import firebase from "firebase/app";
import "firebase/storage";


/**
 * 
 * @param file 
 * @param businessId 
 */
const createLogoForBusiness = async (file:File, businessId:string) => {
    // stock imagemif we have logo
    const storageRef = firebase.storage().ref(`businesses/${businessId}/logo`).child(file.name);
    //TODO:SOLVE THIS PROBLEM OF TS
    // @ts-ignore
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();
 
    return url;
}

/**
 * 
 * @param file 
 * @param firestoreUrl 
 * @param fieldName 
 * 
 */
const uploadFiles = async (files:Array<File>, firestoreUrl:string, fieldName:string):Promise<Array<string>> => {
  const storageUrl = `${firestoreUrl}/${fieldName}`;
  const storageRef = firebase.storage().ref(storageUrl);

  // upload function
  const uploadToStorage = async(file:File) => {
    return new Promise((resolve, reject) => {
      const uploadTask = storageRef.child(file.name).put(file);
      
      uploadTask.on('state_changed', 
        (snapshot) => {},
        (error) => {}, 
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        })});
  }

  // list promises
  try {
    const promises = files.map((file) => uploadToStorage(file));
    const fileUrls = await Promise.all(promises) as Array<string>;
    
    // update object reference on firestore
    // background task
    firebase.firestore().doc(firestoreUrl).update({[fieldName] : fileUrls});

    return fileUrls;
    //TODO:handle errors properly
  } catch (error) {
    console.log(error)
    return [];
  }
}


/**
 * 
 * @param fileUrl 
 */
const deleteFile = async (fileUrl:string, firestoreUrl:string, fieldName:string):Promise<boolean> => {

  try {
    await firebase.storage().refFromURL(fileUrl).delete() 

    // update object reference on firestore
    await firebase.firestore().doc(firestoreUrl).update({
      [fieldName]: firebase.firestore.FieldValue.arrayRemove(fileUrl)
    });

    return true;
  //TODO:handle errors properly
  } catch (error) {
    console.log(error)
    return false;
  }

}


export {createLogoForBusiness, uploadFiles,deleteFile}