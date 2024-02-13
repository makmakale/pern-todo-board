import Typography from '@mui/material/Typography';

function ToolBarTitle() {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.2rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      ToDo Board
    </Typography>
  );
}

export default ToolBarTitle;
