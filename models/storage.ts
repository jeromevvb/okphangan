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


const uploadFile = async (file:File, storageUrl:string) => {
  // stock imagemif we have logo
  const storageRef = firebase.storage().ref(storageUrl).child(file.name);
  await storageRef.put(file);
  const url = await storageRef.getDownloadURL();

  return url;
}

const deleteFile = async (fileUrl:string):Promise<void> => {
  const fileRef = firebase.storage().refFromURL(fileUrl); 

  return fileRef.delete();
}


export {createLogoForBusiness, uploadFile,deleteFile}