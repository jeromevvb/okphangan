import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Autocomplete, { AutocompleteProps } from "./Autocomplete";

const Template: Story<AutocompleteProps> = (args) => <Autocomplete {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "My Input Text",
  name: "myInputText",
  options: [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
  ],
};

export default {
  title: "Autocomplete",
};
