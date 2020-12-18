import React from "react";
import { Story } from "@storybook/react/types-6-0";
import Button, { ButtonProps } from "./Button";

const Template: Story<ButtonProps> = (args) => <Button {...args}></Button>;

export const Default = Template.bind({});
Default.args = {
  children: "Click on me",
};

export const PrimaryContained = Template.bind({});
PrimaryContained.args = {
  children: "Click on me",
  variant: "contained",
  color: "primary",
};

export const Loader = Template.bind({});
Loader.args = {
  children: "Click on me",
  variant: "contained",
  color: "primary",
  loader: true,
};

export default {
  title: "Button",
  parameters: {
    notes:
      "full documentation here: https://material-ui.com/components/buttons/#customized-buttons",
  },
};
