import React, { useEffect, useState } from "react";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import InputText from "@components/InputText";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { Box, createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import BodyText from "@components/BodyText";

export interface Option {
  inputValue?: string;
  new?: boolean;
  label: string;
  value: string;
}

export interface AutocompleteProps {
  label: string;
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
  const { label, onChange: handleChange, options, value: defaultValue } = props;
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
    freeSolo: true,
    handleHomeEndKeys: true,
    getOptionLabel: (option) => {
      // Value selected with enter, right from the input
      if (typeof option === "string") {
        return option;
      }
      // Add "xxx" option created dynamically
      if (option.inputValue) {
        return option.inputValue;
      }
      // Regular option
      return option.label;
    },
    onChange: (event, newValue: Option) => {
      if (newValue && newValue.inputValue) {
        const returnedValue = {
          label: newValue.inputValue,
          value: newValue.value,
          new: true,
        };
        // Create a new value from the user input
        handleChange(returnedValue);
      } else {
        handleChange(newValue);
      }
    },
    filterOptions: (options, params) => {
      const filtered = filter(options, params);

      // Suggest the creation of a new value
      if (params.inputValue !== "") {
        filtered.push({
          inputValue: params.inputValue,
          value: params.inputValue,
          label: `Add "${params.inputValue}"`,
          new: true,
        });
      }

      return filtered;
    },
  });

  return (
    <Box style={{ position: "relative" }} marginBottom={2}>
      <div {...getRootProps()}>
        <InputText
          InputLabelProps={getInputLabelProps()}
          name={name}
          fullWidth
          inputProps={getInputProps()}
          label={label}
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
