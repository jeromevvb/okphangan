import FormAutocomplete from "@components/FormAutocomplete";
import useCategories from "@hooks/useCategories";
import { FormikValues, useFormikContext } from "formik";
import React, { Fragment } from "react";

export interface FormCategoryProps {}

const FormCategory: React.FC<FormCategoryProps> = ({}) => {
  const { categories, types, tags } = useCategories();
  const { values, errors, setFieldValue } = useFormikContext<FormikValues>();

  const handleChangeCategory = () => {
    setFieldValue("type", "");
  };

  const categoryValue = values["category"];
  const typesOptions = types[categoryValue] || [];

  return (
    <div>
      <FormAutocomplete
        name="category"
        options={categories}
        label="Category of your business"
        handleChange={handleChangeCategory}
      />
      {categoryValue && (
        <Fragment>
          <FormAutocomplete
            name="type"
            options={typesOptions}
            label="Type of your business"
          />
          <FormAutocomplete
            multiple
            freeSolo
            limitTags={5}
            name="tags"
            options={tags}
            label="Add some tags (max 5 tags)"
          />
        </Fragment>
      )}
    </div>
  );
};

export default FormCategory;
