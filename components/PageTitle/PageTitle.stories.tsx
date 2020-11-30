import React from "react";
import { Story } from "@storybook/react/types-6-0";
import PageTitle, { PageTitleProps } from "./PageTitle";

const Template: Story<PageTitleProps> = (args) => (
  <PageTitle {...args}></PageTitle>
);

export const Default = Template.bind({});
Default.args = {
  title: "We knew it",
  subtitle: "Almost before we knew it, we had left the ground",
};

export default {
  title: "PageTitle",
};
