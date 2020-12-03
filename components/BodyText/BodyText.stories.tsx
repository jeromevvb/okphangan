import React from "react";
import { Story } from "@storybook/react/types-6-0";
import BodyText, { BodyTextProps } from "./BodyText";

const Template: Story<BodyTextProps> = (args) => (
  <BodyText {...args}></BodyText>
);

export const Default = Template.bind({});
Default.args = {
  children: "I'm a body text",
};

export const Body2 = Template.bind({});
Body2.args = {
  children: "I'm a body text with variant body2",
  variant: "body2",
};

export const ExtraLight = Template.bind({});
ExtraLight.args = {
  ...Default.args,
  fontWeight: "extraLight",
};

export const Light = Template.bind({});
Light.args = {
  ...Default.args,
  fontWeight: "light",
};

export const Regular = Template.bind({});
Regular.args = {
  ...Default.args,
  fontWeight: "regular",
};

export default {
  title: "BodyText",
  parameters: {
    notes: "full documentation here: https://material-ui.com/api/typography/",
  },
};
