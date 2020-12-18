import * as Yup from "yup";
import { UserModel } from "./auth";
import firebase from "firebase/app";
import "firebase/storage";
import makeSlug from 'limax';

const phoneRegExp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
//.matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url')
const nameRegExp = /^[a-zA-Z0-9 ?@'!]*$/

export const placeCreationSchema = Yup.object().shape({
  name: Yup.string().matches(nameRegExp, 'Name is not valid, only use english alphabet').label("Name").default("").required(),
  website: Yup.string().label("Website").default(""),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').label("Phone").default("").required(),
  category: Yup.string().label('Category').default('').required(),
  // type: Yup.string().default('').required(),
  hasGeocoding: Yup.boolean().default(true),
  description:Yup.string().max(250).label("Description").default("").required(),
  logo:Yup.array(Yup.mixed()).default([]),
  geocoding:Yup.object().shape({lat:Yup.number(), lng:Yup.number()})
}).required();

export type PlaceCreationValues = Yup.InferType<typeof placeCreationSchema>;

export type PlaceModel = PlaceCreationValues & {
  createdAt:firebase.firestore.Timestamp,
  userId:string,
  slug:string
};

/**
 * 
 * @param user 
 * @param placeForm 
 */

const createPlace = async (user:UserModel, placeForm:PlaceCreationValues) => {
  
  // extract logo and complete form
  const form:PlaceModel = {
    ...placeForm, 
    createdAt:firebase.firestore.Timestamp.now(), 
    userId:user.uid,
    slug:makeSlug(placeForm.name, { separateNumbers: true, separateApostrophes: true })
  };
  delete form.logo;

  // create business 
  const createBusinessRequest = await firebase.firestore().collection("places").add(form);
  const businessId = createBusinessRequest.id;
  
  // stock imagemif we have logo
  if(placeForm.logo?.length !== 0){
    const storageRef = firebase.storage().ref(`places/${businessId}/logo`);
    //TODO:SOLVE THIS PROBLEM OF TS
    // @ts-ignore
    await storageRef.put(placeForm?.logo[0]);
  }


}

export {createPlace}