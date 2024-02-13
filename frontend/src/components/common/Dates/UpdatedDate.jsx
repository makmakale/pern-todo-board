import { Typography } from '@mui/material';

function UpdatedDate({ date }) {
  return (
    <Typography variant="body2">
      Updated: {new Date(date).toLocaleDateString()}
    </Typography>
  );
}

export default UpdatedDate;
