import * as Yup from "yup";
import firebase from "@services/firebase";
import makeSlug from 'limax';

const phoneRegExp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
//.matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url')
const nameRegExp = /^[a-zA-Z0-9 ?@'!]*$/

// /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig

const fbRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig

const instaRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.instagram|instagram|insta)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig


//TODO: make it work matches regex with not required field
// maybe extend an object shape?
export const businessCreationSchema = Yup.object().shape({
  name: Yup.string().matches(nameRegExp, 'Name is not valid, only use english alphabet').label("Name").default("").required(),
  website: Yup.string().label("Website").default(""),
  // facebookPage: Yup.string().matches(fbRegex,'Your facebook address is not valid').label("Facebook page").default(""),
  // facebookPage: Yup.string().matches(fbRegex,'Your facebook address is not valid').label("Facebook page").default(""),
  instagramPage: Yup.string().label("Instagram page").default(""),
  facebookPage: Yup.string().label("Facebook page").default(""),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').label("Phone").default("").required(),
  email: Yup.string().email().label("Email").default("").required(),
  category: Yup.string().label('Category').default('').required(),
  type:  Yup.string().label('Type').default('').required(),
  tags:Yup.array(Yup.string().required()).ensure(),
  hasGeocoding: Yup.boolean().default(true).required(),
  description:Yup.string().max(250).label("Description").default("").required(),
  logo:Yup.array(Yup.string().required()).ensure(),
  photos:Yup.array(Yup.string().required()).ensure(),
  geocoding:Yup.object().shape({lat:Yup.number(), lng:Yup.number()}).default({lat:0, lng:0})
}).required();

export type BusinessCreationValues = Yup.InferType<typeof businessCreationSchema>;

export type BusinessModel = BusinessCreationValues & {
  id:string,
  createdAt:firebase.firestore.Timestamp,
  updateAt:firebase.firestore.Timestamp,
  userId:string,
  slug:string
};

/**
 * 
 * @param businessForm 
 * @param businessId
 * We don't really create the business because it has been created before,
 * but we add more info after onboarding
 *  
 */

const updateBusiness = async (businessForm:BusinessCreationValues, businessId:string) => {
  // create slug 
  const slug = makeSlug(businessForm.name, { separateNumbers: true, separateApostrophes: true });

  // extract logo and complete form
  const form = {
    ...businessForm, 
    slug
  };
 
  // updat business 
  await firebase.firestore().collection('businesses').doc(businessId).update(form);
  
  return slug;
}



export {updateBusiness}