import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import InputCheckbox, { InputCheckboxProps } from "./InputCheckbox";

const Template: Story<InputCheckboxProps> = (args) => (
  <InputCheckbox {...args} />
);

export const Default = Template.bind({});
Default.args = { label: "My Input checbox", name: "myInputCheckbox" };

export const Helper = Template.bind({});
Helper.args = {
  label: "My Input checbox",
  name: "myInputCheckbox",
  helper: "i'm here to help",
};

export const Error = Template.bind({});
Error.args = {
  label: "My Input checbox",
  name: "myInputCheckbox",
  error: true,
  errorMessage: "there is an error here",
};

export default {
  title: "InputCheckbox",
  parameters: {
    notes:
      "full documentation here: https://material-ui.com/components/checkboxes/#checkbox",
  },
};
