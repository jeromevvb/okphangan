import React from "react";
import { Story } from "@storybook/react/types-6-0";
import WelcomeContainer, { WelcomeContainerProps } from "./WelcomeContainer";
import Title from "../Title";

const Template: Story<WelcomeContainerProps> = ({ children, ...args }) => (
  <WelcomeContainer {...args}>{children}</WelcomeContainer>
);

export const Default = Template.bind({});
Default.args = {
  children: <Title>Hello world</Title>,
};

export default {
  title: "WelcomeContainer",
};
