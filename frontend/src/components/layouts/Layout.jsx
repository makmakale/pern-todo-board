import Notifications from '@/components/common/Notifications';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Container maxWidth="lg">
        <Outlet />
      </Container>

      <Notifications />
    </>
  );
}

export default Layout;
