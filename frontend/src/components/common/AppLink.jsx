import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function CustomLink(props) {
  return (
    <RouterLink {...props}>
      <MuiLink {...props}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {props.title}
      </MuiLink>
    </RouterLink>
  );
}

export default CustomLink;
