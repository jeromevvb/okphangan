import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Title, { TitleProps } from "./Title";

const Template: Story<TitleProps> = ({ children, ...args }) => (
  <Title {...args}>{children}</Title>
);

export const Default = Template.bind({});
Default.args = {
  children: "Almost before we knew it, we had left the ground.",
};

export default {
  title: "Title",
  parameters: {
    notes:
      "full documentation here:  https://material-ui.com/components/typography/#typography",
  },
};
