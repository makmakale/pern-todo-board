import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateTaskButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={() => navigate('/create')}
      startIcon={<AddIcon />}
    >
      Create Task
    </Button>
  );
}

export default CreateTaskButton;
