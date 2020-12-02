import Button from "@components/Button/Button";
import { Box, ButtonGroup, InputLabel } from "@material-ui/core";
import React, { useState } from "react";

export type Option = { label: string; value: string | number };

interface ButtonRadiosProps {
  options: Array<Option>;
  label?: string;
  onChange(otpion: Option): void;
}

const ButtonRadios: React.FC<ButtonRadiosProps> = (props) => {
  const { options, onChange, label } = props;
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const selectOption = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const ButtonComponents = options.map((option) => {
    return (
      <Button
        key={option.value}
        onClick={() => selectOption(option)}
        variant={
          option.value === selectedOption?.value ? "contained" : "outlined"
        }
      >
        {option.label}
      </Button>
    );
  });

  return (
    <Box marginBottom={2}>
      <Box marginBottom={1}>
        <InputLabel shrink htmlFor={"name"}>
          {label}
        </InputLabel>
      </Box>
      <ButtonGroup disableElevation color="primary">
        {ButtonComponents}
      </ButtonGroup>
      {/* {(errorMessage || helper) && (
        <FormHelperText>{errorMessage || helper}</FormHelperText>
      )} */}
    </Box>
  );
};

export default ButtonRadios;
