import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import InputText, { InputTextProps } from "./InputText";

const Template: Story<InputTextProps> = (args) => <InputText {...args} />;

export const Default = Template.bind({});
Default.args = { label: "My Input Text", name: "myInputText" };

export const Placeholder = Template.bind({});
Placeholder.args = { ...Default.args, placeholder: "I'm a placeholder" };

export const Helper = Template.bind({});
Helper.args = { ...Placeholder.args, helper: "I'm here to help you" };

export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  error: true,
  errorMessage: "Must be a string",
};

export default {
  title: "InputText",
  parameters: {
    notes:
      "full documentation here:  https://material-ui.com/api/input-base/#inputbase-api",
  },
};
