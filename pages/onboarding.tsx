import { GetServerSidePropsContext } from "next";
import React from "react";
import nookies from "nookies";
import firebaseAdmin from "@services/firebaseAdmin";
import useAuth from "@auth/useAuth";

interface OnboardingProps {}

const Onboarding: React.FC<OnboardingProps> = ({}) => {
  const { user } = useAuth();

  // if(!user){

  // }

  return <div></div>;
};

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   try {
//     const cookies = nookies.get(ctx);
//     const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

//     // the user is authenticated!
//     const { uid, email } = token;

//     console.log(uid, email);
//     const db = firebaseAdmin.firestore().collection("users").doc(uid);
//     const user = await db.get();

//     console.log(user.data());

//     return {
//       props: { message: `Your email is ${email} and your UID is ${uid}.` },
//     };
//   } catch (err) {
//     console.log(err);

//     // either the `token` cookie didn't exist
//     // or token verification failed
//     // either way: redirect to the login page
//     ctx.res.writeHead(302, { Location: "/" });
//     ctx.res.end();

//     // `as never` prevents inference issues
//     // with InferGetServerSidePropsType.
//     // The props returned here don't matter because we've
//     // already redirected the user.
//     return { props: {} as never };
//   }
// };

export default Onboarding;
