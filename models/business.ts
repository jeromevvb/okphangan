import * as Yup from "yup";
import firebase from "@services/firebase";
import makeSlug from 'limax';

const phoneRegExp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/

const nameRegExp = /^[a-zA-Z0-9 ?@'!]*$/

const websiteRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const fbRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig

const instaRegex = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.instagram|instagram|insta)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig


//TODO: make it work matches regex with not required field
// maybe extend an object shape?
export const businessCreationSchema = Yup.object().shape({
  name: Yup.string().matches(nameRegExp, 'Name is not valid, only use english alphabet').label("Name").default("").required(),
  website: Yup.string().matches(websiteRegex, { excludeEmptyString: true, message: 'Your website address is not valid'}).label("Website").default(""),
  facebookPage: Yup.string().matches(fbRegex, { excludeEmptyString: true, message: 'Your facebook address is not valid'}).label("Facebook page").default(""),
  instagramPage: Yup.string().matches(instaRegex,{ excludeEmptyString: true, message: 'Your instagram address is not valid'}).label("Instagram page").default(""),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').label("Phone").default("").required(),
  hasWhatsapp:Yup.bool().default(false),
  hasLine:Yup.bool().default(false),
  email: Yup.string().email().label("Email").default("").required(),
  category: Yup.string().label('Category').default('').required(),
  type:  Yup.string().label('Type').default('').required(),
  tags:Yup.array(Yup.string().required()).ensure(),
  hasGeocoding: Yup.boolean().default(true).required(),
  description:Yup.string().max(250).label("Description").default("").required(),
  logo:Yup.array(Yup.string().required()).ensure(),
  photos:Yup.array(Yup.string().required()).ensure(),
  geocoding:Yup.object().shape({lat:Yup.number(), lng:Yup.number()}).default({lat:9.739361414252208, lng:100.01382082595171})
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
 * create business
 * business is created as soon as the user is logged as a business owner
 * @param userId 
 */
const createBusiness = async (userId:string) => {

  const createBusinessRequest = await firebase.firestore().collection("businesses").add(
    {
      userId,
      createdAt:firebase.firestore.Timestamp.now()
    }
  );

  return createBusinessRequest.id
} 


/**
 * 
 * @param businessForm 
 * @param businessId
 * We don't really create the business because it has been created before,
 * but we add more info after onboarding
 *  
 */ 

const updateBusiness = async (businessForm:BusinessCreationValues, businessId:string):Promise<{slug:string, name:string, id:string}> => {
  // create slug 
  const slug = makeSlug(businessForm.name, { separateNumbers: true, separateApostrophes: true });

  // extract logo and complete form
  const form = {
    ...businessForm,
    updateAt:firebase.firestore.Timestamp.now(),
    slug
  };
 
  // update business 
  await firebase.firestore().collection('businesses').doc(businessId).update(form);
  
  return {slug, name:form.name, id:businessId};
}



const searchBusiness = async (search:string):Promise<Array<BusinessModel>> => {

  const request = await firebase
  .firestore()
  .collection("businesses")
  .where("tags", "array-contains", search)
  .get();

  return request.docs.map(doc=>doc.data() as BusinessModel);
}


const getRecentlyJoined = async():Promise<Array<BusinessModel>> => {

  const request = await firebase
    .firestore()
    .collection("businesses")
    .orderBy('createdAt', 'desc')
    .limit(6)
    .get()


    return request.docs.map(doc=>doc.data() as BusinessModel);
}


export {updateBusiness,createBusiness,searchBusiness, getRecentlyJoined}