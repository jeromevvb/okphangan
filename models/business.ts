import * as Yup from "yup";
import { UserModel } from "./auth";
import firebase from "firebase/app";
import "firebase/storage";
import makeSlug from 'limax';

const phoneRegExp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
//.matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url')
const nameRegExp = /^[a-zA-Z0-9 ?@'!]*$/

export const businessCreationSchema = Yup.object().shape({
  name: Yup.string().matches(nameRegExp, 'Name is not valid, only use english alphabet').required().label("Name").default(""),
  website: Yup.string().label("Website").default(""),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required().label("Phone").default(""),
  type: Yup.string().required().default(''),
  description:Yup.string().max(250).label("Description").default("").required(),
  logo:Yup.array(Yup.object().shape({file:Yup.mixed()})).default([]),
  geocoding:Yup.object().shape({lat:Yup.number().required(), lng:Yup.number().required()}).required()
}).required();

export type BusinessCreationValues = Yup.InferType<typeof businessCreationSchema>;


export type BusinessModel = {
  name:string,
  website?:string,
  phone:string,
  type:string,
  description:string,
  logo?:string,
  geocoding:{
    lat:number,
    lng:number
  },
  createdAt:firebase.firestore.Timestamp,
  userId:string,
  slug:string,
}

const createBusiness = async (user:UserModel, businesForm:BusinessCreationValues) => {

  // extract logo and complete form
  const form = {
    ...businesForm, 
    createdAt:firebase.firestore.Timestamp.now(), 
    userId:user.uid,
    slug:makeSlug(businesForm.name, { separateNumbers: true, separateApostrophes: true })
  };
  delete form.logo;


  // create business 
  const createBusinessRequest = await firebase.firestore().collection("businesses").add(form);
  const businessId = createBusinessRequest.id;
  
  // stock imagemif we have logo
  if(businesForm.logo?.length !== 0){
    const storageRef = firebase.storage().ref(`businesses/${businessId}/logo`);
    //TODO:SOLVE THIS PROBLEM OF TS
    //@ts-ignore
    await storageRef.put(businesForm?.logo[0]);
  }


}

export {createBusiness}