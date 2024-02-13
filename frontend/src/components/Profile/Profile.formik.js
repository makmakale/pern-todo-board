import * as yup from 'yup';

export const profileValidationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(4, 'Username should be of minimum 4 characters length')
    .required('Username is required'),
  email: yup
    .string('Enter your email')
    .email(),
  firstName: yup
    .string('Enter your First name')
    .min(3, 'First name should be of minimum 3 characters length')
    .required('First name is required'),
  lastName: yup
    .string('Enter your Last name')
    .min(3, 'Last name should be of minimum 3 characters length')
    .required('Last name is required'),
});
