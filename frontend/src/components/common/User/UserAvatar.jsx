import { getShortUserName } from '@/utils/board';
import { IMAGE_PATH } from '@/utils/constants';
import Avatar from '@mui/material/Avatar';

function UserAvatar({ user }) {
  return (
    <Avatar
      alt={user.username}
      sx={{ fontSize: '1rem' }}
      src={user.image ? `${IMAGE_PATH}/${user.image}` : ''}
    >
      {getShortUserName(user)}
    </Avatar>
  );
}

export default UserAvatar;
