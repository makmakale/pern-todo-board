import { Link as MuiLink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));

const theme = createTheme();

function CustomLink(props) {
  const classes = useStyles();

  return (
    <RouterLink {...props}>
      <MuiLink className={classes.link} {...props}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {props.title}
      </MuiLink>
    </RouterLink>
  );
}

function AppLink(props) {
  return (
    <ThemeProvider theme={theme}>
      <CustomLink {...props} />
    </ThemeProvider>
  );
}

export default AppLink;
