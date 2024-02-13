import { FormControl, MenuItem, Select } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';

function SelectField(props) {
  const {
    id,
    label,
    field,
    form,
    fullWidth = true,
    required = false,
    options = [],
    children,
    ...rest
  } = props;

  const error = form.touched[field.name] && Boolean(form.errors[field.name]);

  return (
    <FormControl fullWidth={fullWidth} error={error} required={required} margin="dense">
      {label ? <FormLabel>{label}</FormLabel> : null}

      <Select
        fullWidth={fullWidth}
        id={id || field.name}
        {...field}
        error={error}
        required={required}
        {...rest}
        size="small"
      >
        {options.length > 0 ? options.map(({ value: optValue, label: optLabel }) => (
          <MenuItem
            key={optValue}
            value={optValue}
          >
            {optLabel}
          </MenuItem>
        )) : children}
      </Select>

      {error
        ? (<FormHelperText>{form.errors[field.name]}</FormHelperText>)
        : null}
    </FormControl>
  );
}

export default SelectField;
