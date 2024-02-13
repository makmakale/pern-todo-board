import { selectCurrentUser } from '@/utils/rtk/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const userInfo = useSelector(selectCurrentUser);
  const location = useLocation();

  return (
    userInfo
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
