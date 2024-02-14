import { getShortUserName } from '@/utils/board';
import Avatar from '@mui/material/Avatar';

function UserAvatar({ user }) {
  return (
    <Avatar
      alt={user.username}
      sx={{ fontSize: '1rem' }}
      src={user.image ? user.image : ''}
    >
      {getShortUserName(user)}
    </Avatar>
  );
}

export default UserAvatar;
