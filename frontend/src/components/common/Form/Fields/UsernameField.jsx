import InputField from '@/components/common/Form/InputField';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import { Field } from 'formik';

function UsernameField() {
  return (
    <Field
      name="username"
      label="Username"
      required
      component={InputField}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default UsernameField;
