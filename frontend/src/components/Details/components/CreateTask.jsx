import Form from '@/components/common/Form';
import FormGrid from '@/components/Details/components/FormGrid';
import { taskInitialValues, taskValidationSchema } from '@/components/Details/Details.formik';
import { useAddTaskMutation } from '@/utils/rtk/tasks/taskApiSlice';
import { useNavigate } from 'react-router-dom';

function CreateTask({ pageTitle }) {
  const navigate = useNavigate();
  const [addTask] = useAddTaskMutation();

  return (
    <>
      <h1>{pageTitle}</h1>
      <Form
        initialValues={taskInitialValues}
        validationSchema={taskValidationSchema}
        onSubmit={async (values) => {
          await addTask({ ...values }).unwrap();
          navigate('/');
        }}
      >
        <FormGrid />
      </Form>
    </>
  );
}

export default CreateTask;
