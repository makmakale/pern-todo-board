import InputField from '@/components/common/Form/InputField';
import SelectField from '@/components/common/Form/SelectField';
import TextEditor from '@/components/common/Form/TextEditor';
import { TaskTypeBox } from '@/components/Task/Task.styles';
import {
  BOARDS_OPTIONS,
  PROJECT_OPTIONS,
  TASK_TYPE_COLORS,
  TASK_TYPE_ICONS,
  TASK_TYPE_OPTIONS,
} from '@/utils/constants';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';

function FormGrid({ children }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Field name="title" label="Title" required component={InputField} />
        <Field name="description" label="Description" component={TextEditor} />
      </Grid>

      <Grid item xs={3}>
        <Field
          name="project"
          label="Project"
          component={SelectField}
          options={PROJECT_OPTIONS}
          disabled
        />

        <Field
          name="status"
          label="Status"
          component={SelectField}
          options={BOARDS_OPTIONS}
        />

        <Field
          name="type"
          label="Issue type"
          component={SelectField}
        >
          {TASK_TYPE_OPTIONS.map(({ value: typeValue, label: typeLabel }) => (
            <MenuItem key={typeValue} value={typeValue} sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TaskTypeBox color={TASK_TYPE_COLORS[typeValue]} style={{ marginRight: 5 }}>
                  <i className={TASK_TYPE_ICONS[typeValue]} />
                </TaskTypeBox>
                {typeLabel}
              </Box>
            </MenuItem>
          ))}
        </Field>

        {children}
      </Grid>
    </Grid>
  );
}

export default FormGrid;
