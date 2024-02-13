import { Typography } from '@mui/material';

function CreatedDate({ date }) {
  return (
    <Typography variant="body2" sx={{ my: 2 }}>
      Created: {new Date(date).toLocaleDateString()}
    </Typography>
  );
}

export default CreatedDate;
