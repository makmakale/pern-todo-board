import CreatedDate from '@/components/common/Dates/CreatedDate';
import FormActions from '@/components/common/Form/FormActions';
import InputField from '@/components/common/Form/InputField';
import { profileValidationSchema } from '@/components/Profile/Profile.formik';
import ProfileImage from '@/components/Profile/ProfileImage';
import { useUpdateUserMutation } from '@/utils/rtk/auth/authApiSlice';
import { selectCurrentUser, setCredentials } from '@/utils/rtk/auth/authSlice';
import Grid from '@mui/material/Grid';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const user = useSelector(selectCurrentUser);
  const [updateUser] = useUpdateUserMutation();

  const selectImage = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('image', file);
    } else {
      setFieldValue('image', null);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeImage = (setFieldValue) => {
    setFieldValue('image', null);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // eslint-disable-next-line no-restricted-syntax
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const updatedUser = await updateUser(formData).unwrap();
    dispatch(setCredentials(updatedUser));
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        username: user?.username || '',
        email: user?.email || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        image: user?.image || '',
      }}
      validationSchema={profileValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting, dirty, setFieldValue, values, resetForm,
      }) => (
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item md={9}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Field name="username" label="Username" required component={InputField} />
                </Grid>
                <Grid item md={6}>
                  <Field name="email" label="Email" type="email" component={InputField} />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Field name="firstName" label="First Name" required component={InputField} />
                </Grid>
                <Grid item md={6}>
                  <Field name="lastName" label="Last Name" required component={InputField} />
                </Grid>
              </Grid>

              <CreatedDate date={user?.createdAt} />
            </Grid>

            <Grid item md={3}>
              <ProfileImage
                imageSrc={user.image}
                imageAlt={user.username}
                selectedImage={values.image}
                selectImage={(e) => selectImage(e, setFieldValue)}
                removeImage={() => removeImage(setFieldValue)}
              />
            </Grid>
          </Grid>

          <FormActions disabled={!dirty || isSubmitting} resetForm={resetForm} />
        </Form>
      )}
    </Formik>
  );
}

export default Profile;
