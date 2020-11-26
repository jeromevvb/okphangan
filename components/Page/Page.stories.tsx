import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Page, { PageProps } from "./Page";

const Template: Story<PageProps> = (args) => <Page {...args}>Hello world</Page>;

export const Default = Template.bind({});
Default.args = { title: "Hello world" };

export default {
  title: "Page",
};
