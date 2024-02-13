import { FormControl, TextField } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';

function InputField(props) {
  const {
    id,
    label,
    field,
    form,
    fullWidth = true,
    required = false,
    ...rest
  } = props;

  const error = form.touched[field.name] && Boolean(form.errors[field.name]);

  return (
    <FormControl fullWidth={fullWidth} error={error} required={required} margin="dense">
      {label ? <FormLabel>{label}</FormLabel> : null}

      <TextField
        fullWidth={fullWidth}
        id={id || field.name}
        {...field}
        error={error}
        helperText={form.touched[field.name] && form.errors[field.name]}
        autoComplete="off"
        required={required}
        {...rest}
        size="small"
      />
    </FormControl>
  );
}

export default InputField;
