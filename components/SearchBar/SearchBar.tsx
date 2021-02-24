import React from "react";
import MDAutocomplete, {
  AutocompleteProps as MDAutocompleteProps,
} from "@material-ui/lab/Autocomplete";
import {
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
  InputLabelProps?: InputLabelProps;
  label: string;
  // name: string;
  // value: string | null | Array<string>;
  options: Array<Option>;
  onChange(option: Array<string> | string): void;
  onBlur?(e: React.FocusEvent<any>): void;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#EBEBEB",
    border: "1px solid #EBEBEB",
    padding: "16px",
    transition: theme.transitions.create(["border-color"]),
    "&:focus": {
      borderColor: lighten(theme.palette.primary.main, 0.3),
    },
  },
}));

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const { onChange, options, onBlur } = props;

  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<{}>,
    option: Option[] | Option
  ) => {
    // onChange(option.value);
  };

  return (
    <div>
      <MDAutocomplete
        options={options}
        filterSelectedOptions
        // getOptionLabel={(option: Option) => option.label}
        // getOptionSelected={(option: Option, optionSelected: Option) => {
        //   return option.value === optionSelected.value;
        // }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            name={"searchbar"}
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
    </div>
  );
};

export default Autocomplete;
