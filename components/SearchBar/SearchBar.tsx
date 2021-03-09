import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { lighten, makeStyles, TextField, Theme } from "@material-ui/core";
import useCategories from "@hooks/useCategories";
import { FaSearch } from "react-icons/fa";
import InputAdornment from "@material-ui/core/InputAdornment";

export interface SearchBarProps {
  defaultSearch?: string;
  onChange(search: string): void;
  onBlur?(e: React.FocusEvent<any>): void;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#EBEBEB",
    border: "1px solid #EBEBEB",
    padding: "12px",
    transition: theme.transitions.create(["border-color"]),
    "&:focus": {
      borderColor: lighten(theme.palette.primary.main, 0.3),
    },
  },
}));

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { onChange, onBlur, defaultSearch = "" } = props;
  const { tags } = useCategories();
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    onChange(value);
  };

  return (
    <div>
      <Autocomplete
        options={tags.map((opt) => opt.label)}
        freeSolo
        value={defaultSearch}
        filterSelectedOptions
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            name="searchbar"
            placeholder="What are you looking for?"
            variant="standard"
            classes={{ root: classes.input }}
            {...{
              ...params,
              InputProps: {
                ...params.InputProps,
                disableUnderline: true,
                onBlur,
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchBar;
