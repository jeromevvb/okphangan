import React from "react";
import { Story } from "@storybook/react/types-6-0";
import ButtonSocial, { ButtonSocialProps } from "./ButtonSocial";

const Template: Story<ButtonSocialProps> = (args) => (
  <ButtonSocial {...args}></ButtonSocial>
);

export const Facebook = Template.bind({});
Facebook.args = {
  social: "facebook",
};

export const Google = Template.bind({});
Google.args = {
  social: "google",
};

export default {
  title: "ButtonSocial",
};
