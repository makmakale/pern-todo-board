import { BOARD_IDS } from '@/utils/constants';
import * as yup from 'yup';

export const taskValidationSchema = yup.object({
  title: yup
    .string('Enter title')
    .required('Title is required'),
  project: yup
    .string('Select project title')
    .required('Project is required'),
  status: yup
    .string('Select status title')
    .required('Status is required'),
  type: yup
    .string('Select type title')
    .required('Type is required'),
});

export const taskInitialValues = {
  project: 'tdb',
  status: BOARD_IDS.todo,
  type: 'task',
  title: '',
  description: '',
};
