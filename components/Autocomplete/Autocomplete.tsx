import React from "react";
import MDAutocomplete, {
  AutocompleteProps as MDAutocompleteProps,
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
  new?: boolean;
  label: string;
  value: string;
}

export interface AutocompleteProps {
  helper?: string;
  errorMessage?: string;
  error?: boolean;
  InputLabelProps?: InputLabelProps;
  multiple?: boolean;
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
    onBlur,
    name,
  } = props;

  const classes = useStyles();
  let parsedValue: Option | Option[] | null = null;

  const handleChange = (
    event: React.ChangeEvent<{}>,
    option: Option[] | Option
  ) => {
    if (option instanceof Array) {
      return onChange(option.map((n) => n.value));
    }

    onChange(option.value);
  };

  if (value instanceof Array) {
    console.log("======== value", value, options);

    parsedValue = value.reduce((state, node) => {
      const option = options.find((option) => option.value === node);

      if (!option) {
        return state;
      }

      return [...state, option];
    }, []);

    console.log("===== parsedValue", parsedValue);
  } else {
    parsedValue = options.find((option) => option.value === value) || null;
  }

  return (
    <div>
      <InputLabel error={error} {...InputLabelProps}>
        {label}
      </InputLabel>
      <MDAutocomplete
        multiple={multiple}
        options={options}
        filterSelectedOptions
        value={parsedValue}
        getOptionLabel={(option: Option) => option.label}
        getOptionSelected={(option: Option, optionSelected: Option) => {
          return option.value === optionSelected.value;
        }}
        onChange={handleChange}
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
