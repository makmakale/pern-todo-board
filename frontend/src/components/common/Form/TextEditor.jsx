import { FormControl } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import ReactQuill from 'react-quill';

function TextEditor(props) {
  const {
    id,
    label,
    field,
    fullWidth = true,
  } = props;

  const handleChange = (value) => {
    field.onChange({ target: { name: field.name, value } });
  };

  return (
    <FormControl fullWidth={fullWidth} margin="dense">
      {label ? <FormLabel>{label}</FormLabel> : null}

      <ReactQuill
        theme="snow"
        id={id || field.name}
        value={field.value}
        onChange={handleChange}
      />
    </FormControl>
  );
}

export default TextEditor;
