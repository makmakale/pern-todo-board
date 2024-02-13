import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { key: 'login', link: '/login', title: 'Sign In' },
  { key: 'register', link: '/register', title: 'Sign Up' },
];

function ToolbarActions() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
      {navItems.map((nav) => (
        <Button
          key={nav.key}
          onClick={() => navigate(nav.link)}
          color="inherit"
        >
          {nav.title}
        </Button>
      ))}
    </Box>
  );
}

export default ToolbarActions;
