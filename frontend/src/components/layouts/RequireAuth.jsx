import { selectCurrentToken } from '@/utils/rtk/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return (
    token
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
