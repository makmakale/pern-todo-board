import { useToolBarUserHooks } from '@/components/Board/components/ToolBar/components/ToolBarUser/ToolBarUser.hooks';
import UserAvatar from '@/components/common/User/UserAvatar';
import { logOut } from '@/utils/rtk/auth/authSlice';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ToolBarUser({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    try {
      dispatch(logOut());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const {
    open, anchorRef, handleToggle, handleClose, close,
  } = useToolBarUserHooks();

  return (
    <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
      <IconButton ref={anchorRef} onClick={handleToggle} sx={{ p: 0 }}>
        <UserAvatar user={user} />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom"
        transition
        disablePortal
        sx={{ zIndex: 999 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper sx={{ mt: '10px' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open}>
                  <MenuItem
                    key="profile"
                    onClick={() => {
                      close();
                      // to prevent sticky menu after location change
                      setTimeout(() => {
                        navigate('/profile');
                      }, 100);
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem key="logout" onClick={logoutHandler}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

export default ToolBarUser;
