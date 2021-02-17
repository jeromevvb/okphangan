import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import InputUpload, { InputUploadProps } from "./InputUpload";

const Template: Story<InputUploadProps> = (args) => (
  <InputUpload onDelete={() => {}} onUpload={() => {}} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "My Input Upload",
  name: "myInputUpload",
  files: [],
};

export const Loader = Template.bind({});
Loader.args = {
  label: "My Input Upload",
  loading: true,
  name: "myInputUpload",
  files: [],
};

export default {
  title: "InputUpload",
};
