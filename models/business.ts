import * as Yup from "yup";

const phoneRegExp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/


export const businessCreationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name").default(""),
  website: Yup.string().label("Website").default(""),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required().label("Phone").default(""),
  type: Yup.string().required().default(""),
  description:Yup.string().max(250).label("Description").default(""),
  logo:Yup.array().default([])
  // logo
  // geolocalization
});

export type BusinessCreationValues = Yup.InferType<typeof businessCreationSchema>;