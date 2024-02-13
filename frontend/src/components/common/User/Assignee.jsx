import { getUserName } from '@/utils/board';
import { Typography } from '@mui/material';

function Assignee({ user }) {
  return (
    <Typography variant="body2">
      Assignee: {getUserName(user)}
    </Typography>
  );
}

export default Assignee;
