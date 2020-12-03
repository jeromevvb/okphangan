import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import InputUpload, { InputUploadProps } from "./InputUpload";

const Template: Story<InputUploadProps> = (args) => <InputUpload {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "My Input Upload",
  name: "myInputUpload",
  onChange: () => {},
};

export default {
  title: "InputUpload",
};
