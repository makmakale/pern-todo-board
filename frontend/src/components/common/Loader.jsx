import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <Stack
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <CircularProgress />
    </Stack>
  );
}

export default Loader;
