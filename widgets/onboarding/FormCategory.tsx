import FormAutocomplete from "@components/FormAutocomplete";
import useCategories from "@hooks/useCategories";
import { FormikValues, useFormikContext } from "formik";
import React, { Fragment } from "react";

export interface FormCategoryProps {}

const FormCategory: React.FC<FormCategoryProps> = ({}) => {
  const { categories, types, tags } = useCategories();
  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const handleChangeCategory = () => {
    setFieldValue("type", "");
  };

  console.log(values);

  return (
    <div>
      <FormAutocomplete
        name="category"
        options={categories}
        label="Category of your business"
        handleChange={handleChangeCategory}
      />
      {values["category"] && (
        <Fragment>
          <FormAutocomplete
            name="type"
            options={types[values["category"]]}
            label="Type of your business"
          />
          <FormAutocomplete
            multiple
            name="tags"
            options={tags}
            label="Type some tags"
          />
        </Fragment>
      )}
    </div>
  );
};

export default FormCategory;
