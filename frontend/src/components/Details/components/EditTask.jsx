import CreatedDate from '@/components/common/Dates/CreatedDate';
import UpdatedDate from '@/components/common/Dates/UpdatedDate';
import Form from '@/components/common/Form';
import Loader from '@/components/common/Loader';
import Assignee from '@/components/common/User/Assignee';
import FormGrid from '@/components/Details/components/FormGrid';
import { taskInitialValues, taskValidationSchema } from '@/components/Details/Details.formik';
import { useEditTaskMutation, useGetTaskQuery } from '@/utils/rtk/tasks/taskApiSlice';
import { useNavigate } from 'react-router-dom';

function EditTask({ id, pageTitle }) {
  const navigate = useNavigate();
  const { data: task, isLoading } = useGetTaskQuery(id);
  const [editTask] = useEditTaskMutation();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (!task && !isLoading) {
    return null;
  }

  return (
    <>
      <h1>{pageTitle}</h1>
      <Form
        initialValues={{
          ...taskInitialValues,
          status: task.status,
          type: task.type,
          title: task.title,
          description: task.description,
        }}
        validationSchema={taskValidationSchema}
        onSubmit={async (values) => {
          await editTask({ id: task.id, ...values });
          navigate('/');
        }}
      >
        <FormGrid>
          <Assignee user={task.user} />
          <CreatedDate date={task.createdAt} />
          <UpdatedDate date={task.updatedAt} />
        </FormGrid>
      </Form>
    </>
  );
}

export default EditTask;
