import AppLink from '@/components/common/AppLink';
import SignForm from '@/components/common/Form/components/SignForm';
import { useLoginMutation } from '@/utils/rtk/auth/authApiSlice';
import { setCredentials } from '@/utils/rtk/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  return (
    <SignForm
      formTitle="Login"
      buttonTitle="Sign In"
      onSubmit={async (values) => {
        const userData = await login(values).unwrap();
        dispatch(setCredentials(userData));
        navigate('/');
      }}
    >
      <div>
        Don&apos;t have an account? <AppLink to="/register" title="Sign Up" />
      </div>
    </SignForm>
  );
}

export default LoginPage;
