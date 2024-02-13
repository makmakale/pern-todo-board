import { clearNotification, selectNotification } from '@/utils/rtk/notifications/notifySlice';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

function Notifications() {
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearNotification());
  };

  if (!notification || !notification.type || !notification.message) {
    return null;
  }

  return (
    <Snackbar
      open={!!notification.message}
      autoHideDuration={5000}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <Alert
        onClose={handleClose}
        severity={notification.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}

export default Notifications;
