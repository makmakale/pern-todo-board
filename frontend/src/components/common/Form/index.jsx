import FormActions from '@/components/common/Form/FormActions';
import { Form as FForm, Formik } from 'formik';

function Form({ children, ...props }) {
  return (
    <Formik {...props}>
      {({ isSubmitting, dirty, resetForm }) => (
        <FForm style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {children}
          <FormActions disabled={!dirty || isSubmitting} isLoading={isSubmitting} resetForm={resetForm} />
        </FForm>
      )}
    </Formik>
  );
}

export default Form;
