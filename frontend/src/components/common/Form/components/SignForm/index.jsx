import { signFormikParams } from '@/components/common/Form/components/SignForm/SignForm.formik';
import PasswordField from '@/components/common/Form/Fields/PasswordField';
import UsernameField from '@/components/common/Form/Fields/UsernameField';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { Form, Formik } from 'formik';

function SignForm(props) {
  const {
    formTitle,
    buttonTitle,
    onSubmit,
    children,
  } = props;

  return (
    <Formik
      initialValues={signFormikParams.initialValues}
      validationSchema={signFormikParams.validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Card sx={{ width: 400, mx: 'auto' }}>
            <CardHeader title={formTitle} sx={{ textAlign: 'center' }} />
            <Divider />

            <CardContent>
              <UsernameField />
              <PasswordField />
            </CardContent>

            <CardActions sx={{ paddingX: '16px' }}>
              <LoadingButton
                loading={isSubmitting}
                loadingPosition="start"
                startIcon={<LoginIcon />}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                {buttonTitle}
              </LoadingButton>
            </CardActions>

            {children ? (
              <CardContent>
                {children}
              </CardContent>
            ) : null}
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default SignForm;
