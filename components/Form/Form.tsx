import React from "react";
import { Formik, FormikHelpers } from "formik";

interface FormProps<Values> {
  initialValues: Values;
  children: React.ReactNode;
  validationSchema?: any | (() => any);
  onSubmit(
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ): void | Promise<any>;
}

const Form = function <Values>(props: FormProps<Values>): React.ReactElement {
  const {
    initialValues,
    onSubmit,
    validationSchema,
    children,
    ...rest
  } = props;

  return (
    <Formik
      {...rest}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {() => children}
    </Formik>
  );
};

export default Form;
