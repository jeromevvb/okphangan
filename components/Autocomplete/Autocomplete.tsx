import React, { useEffect, useState } from "react";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import InputText from "@components/InputText";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { Box, createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import BodyText from "@components/BodyText";
import { InputTextProps } from "@components/InputText/InputText";

export interface Option {
  inputValue?: string;
  new?: boolean;
  label: string;
  value: string;
}

export interface AutocompleteProps {
  InputProps: InputTextProps;
  value: Option | undefined;
  options: Array<Option>;
  onChange(option: Option): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listbox: {
      margin: 0,
      width: "100%",
      padding: 0,
      zIndex: 1,
      position: "absolute",
      listStyle: "none",
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
      maxHeight: 200,
      border: "1px solid rgba(0,0,0,.25)",
      '& li[data-focus="true"]': {
        backgroundColor: theme.palette.primary.light,
        color: "white",
        cursor: "pointer",
      },
      "& li:active": {
        backgroundColor: theme.palette.primary.light,
        color: "white",
      },
    },
  })
);

const filter = createFilterOptions<Option>();

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const {
    onChange: handleChange,
    options,
    value: defaultValue,
    InputProps,
  } = props;
  const classes = useStyles();
  const [value, setValue] = useState<Option | undefined>(defaultValue);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    value,
    options,
    selectOnFocus: true,
    clearOnBlur: true,
    handleHomeEndKeys: true,
    getOptionLabel: (option) => {
      // Regular option
      return option.label;
    },
    onChange: (event, newValue: Option) => {
      if (newValue === null) return;
      handleChange(newValue);
    },
    filterOptions: (options, params) => {
      return filter(options, params);
    },
  });

  return (
    <Box position="relative" marginBottom={2}>
      <div {...getRootProps()}>
        <InputText
          InputLabelProps={getInputLabelProps()}
          inputProps={getInputProps()}
          {...InputProps}
        />
      </div>
      {groupedOptions.length > 0 && (
        <Paper classes={{ root: classes.listbox }}>
          <div {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <Box
                  paddingLeft={2}
                  paddingTop={1}
                  paddingBottom={1}
                  paddingRight={2}
                >
                  <BodyText>{option.label}</BodyText>
                </Box>
              </li>
            ))}
          </div>
        </Paper>
      )}
    </Box>
  );
};

export default Autocomplete;
