import * as yup from 'yup';

const signValidationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters length')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
});

export const signFormikParams = {
  initialValues: {
    username: '',
    password: '',
  },
  validationSchema: signValidationSchema,
};
