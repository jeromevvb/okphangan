import React from "react";
import { Story } from "@storybook/react/types-6-0";
import Subtitle, { SubtitleProps } from "./Subtitle";

const Template: Story<SubtitleProps> = ({ children, ...args }) => (
  <Subtitle {...args}>{children}</Subtitle>
);

export const Default = Template.bind({});
Default.args = {
  children: "Almost before we knew it, we had left the ground",
};

export const Strong = Template.bind({});
Strong.args = {
  ...Default.args,
  strong: true,
};

export default {
  title: "Subtitle",
  parameters: {
    notes:
      "full documentation here:  https://material-ui.com/components/typography/#typography",
  },
};
