import * as Yup from "yup";
import { UserModel } from "./auth";
import firebase from "firebase/app";
import "firebase/storage";
import makeSlug from 'limax';

const phoneRegExp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
//.matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url')
const nameRegExp = /^[a-zA-Z0-9 ?@'!]*$/

export const businessCreationSchema = Yup.object().shape({
  name: Yup.string().matches(nameRegExp, 'Name is not valid, only use english alphabet').label("Name").default("").required(),
  website: Yup.string().label("Website").default(""),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').label("Phone").default("").required(),
  category: Yup.string().label('Category').default('').required(),
  type:  Yup.string().label('Type').default('').required(),
  tags:Yup.array().ensure(),
  hasGeocoding: Yup.boolean().default(true),
  description:Yup.string().max(250).label("Description").default("").required(),
  logo:Yup.array().of(Yup.mixed()).ensure(),
  geocoding:Yup.object().shape({lat:Yup.number(), lng:Yup.number()})
}).required();

export type BusinessCreationValues = Yup.InferType<typeof businessCreationSchema>;

export type BusinessModel = BusinessCreationValues & {
  createdAt:firebase.firestore.Timestamp,
  logoUrl?:string,
  userId:string,
  slug:string
};

/**
 * 
 * @param user 
 * @param placeForm 
 */

const createBusiness = async (user:UserModel, userForm:BusinessCreationValues) => {
  // create slug 
  const slug = makeSlug(userForm.name, { separateNumbers: true, separateApostrophes: true });

  // extract logo and complete form
  const form:BusinessModel = {
    ...userForm, 
    createdAt:firebase.firestore.Timestamp.now(), 
    logoUrl:'',
    userId:user.uid,
    slug
  };
  delete form.logo;

  // create business 
  const createBusinessRequest = await firebase.firestore().collection("businesses").add(form);
  const businessId = createBusinessRequest.id;
  
  // user is now onboarded and have a business id
  await firebase.firestore().collection("users").doc(user.uid).update({onboarded:true, businessId});

  // stock imagemif we have logo
  if(userForm.logo?.length !== 0){
    const storageRef = firebase.storage().ref(`businesses/${businessId}/logo`);
    //TODO:SOLVE THIS PROBLEM OF TS
    // @ts-ignore
    await storageRef.put(userForm.logo[0]);
    const logoUrl = await storageRef.getDownloadURL();
 
    // update business with logoUrl
    await firebase.firestore().collection("businesses").doc(businessId).update({logoUrl})
  }


  return slug;
}

export {createBusiness}