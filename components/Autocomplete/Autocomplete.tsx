import React, { useEffect, useState } from "react";
import MDAutocomplete, {
  AutocompleteProps as MDAutocompleteProps,
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import {
  FormHelperText,
  InputBaseProps,
  InputLabel,
  InputLabelProps,
  lighten,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";

export interface Option {
  inputValue?: string;
  label: string;
  value: string;
}

export interface AutocompleteProps {
  helper?: string;
  errorMessage?: string;
  error?: boolean;
  InputLabelProps?: InputLabelProps;
  multiple?: boolean;
  freeSolo?: boolean;
  label: string;
  name: string;
  value: string | null | Array<string>;
  options: Array<Option>;
  onChange(option: Array<string> | string): void;
  onBlur(e: React.FocusEvent<any>): void;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#EBEBEB",
    border: "1px solid #EBEBEB",
    padding: "6px 12px",
    transition: theme.transitions.create(["border-color"]),
    "&:focus": {
      borderColor: lighten(theme.palette.primary.main, 0.3),
    },
  },
}));

const filter = createFilterOptions<Option | Option[]>();

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const {
    onChange,
    options,
    error,
    InputLabelProps,
    helper,
    errorMessage,
    label,
    value,
    multiple = false,
    freeSolo,
    onBlur,
    name,
  } = props;

  const classes = useStyles();
  let autocompleteValue: Option | Option[] | null = multiple ? [] : null;

  const handleChange = (
    event: React.ChangeEvent<{}>,
    option: Option[] | Option
  ) => {
    // console.log(option);

    if (option instanceof Array) {
      const values = option.map((node: Option | string): string => {
        if (node instanceof Object) {
          return node.value;
        }

        return node;
      });

      console.log(values);

      return onChange(values);
    }

    onChange(option.value);
  };

  if (value instanceof Array) {
    autocompleteValue = value.reduce((state, item) => {
      const option = options.find((option) => option.value === item);

      if (!option) {
        return [...state, { label: item, value: item }];
      }

      return [...state, option];
    }, []);
  } else {
    autocompleteValue =
      options.find((option) => option.value === value) || null;
  }

  return (
    <div>
      <InputLabel error={error} {...InputLabelProps}>
        {label}
      </InputLabel>
      <MDAutocomplete
        freeSolo={freeSolo}
        multiple={multiple}
        options={options}
        filterSelectedOptions
        value={autocompleteValue}
        getOptionLabel={(option: Option) => {
          return option.label;
        }}
        onChange={handleChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              label: `Add "${params.inputValue}"`,
              value: params.inputValue,
            });
          }

          return filtered;
        }}
        renderInput={(params) => (
          <TextField
            name={name}
            variant="standard"
            classes={{ root: classes.input }}
            {...{
              ...params,
              InputProps: {
                ...params.InputProps,
                disableUnderline: true,
                onBlur,
              },
            }}
          />
        )}
      />
      {(errorMessage || helper) && (
        <FormHelperText error={error}>{errorMessage || helper}</FormHelperText>
      )}
    </div>
  );
};

export default Autocomplete;
