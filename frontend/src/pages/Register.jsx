import AppLink from '@/components/common/AppLink';
import SignForm from '@/components/common/Form/components/SignForm';
import { useRegisterMutation } from '@/utils/rtk/auth/authApiSlice';
import { setCredentials } from '@/utils/rtk/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  return (
    <SignForm
      formTitle="Registration"
      buttonTitle="Sign Up"
      onSubmit={async (values) => {
        const userData = await register(values).unwrap();
        dispatch(setCredentials(userData));
        navigate('/profile');
      }}
    >
      <div>
        Already have have an account? <AppLink to="/login" title="Sign In" />
      </div>
    </SignForm>
  );
}

export default RegisterPage;
