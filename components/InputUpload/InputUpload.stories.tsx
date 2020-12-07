import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import InputUpload, { InputUploadProps } from "./InputUpload";

const Template: Story<InputUploadProps> = (args) => (
  <InputUpload onChange={() => {}} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "My Input Upload",
  name: "myInputUpload",
};

export default {
  title: "InputUpload",
};
