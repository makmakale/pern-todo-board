import CreateTaskButton from '@/components/Board/components/ToolBar/components/CreateTaskButton';
import ToolbarActions from '@/components/Board/components/ToolBar/components/ToolbarActions';
import ToolBarTitle from '@/components/Board/components/ToolBar/components/ToolBarTitle';
import ToolBarUser from '@/components/Board/components/ToolBar/components/ToolBarUser';
import { selectCurrentUser } from '@/utils/rtk/auth/authSlice';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux';

function BoardsToolbar() {
  const userInfo = useSelector(selectCurrentUser);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ToolBarTitle />
          <CreateTaskButton />

          {userInfo ? <ToolBarUser user={userInfo} /> : <ToolbarActions />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default BoardsToolbar;
