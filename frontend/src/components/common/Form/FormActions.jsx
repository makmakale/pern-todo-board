import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function FormActions({
  isLoading, onCancel, disabled = false, resetForm,
}) {
  const navigate = useNavigate();
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/');
    }
    resetForm();
  };

  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Button color="primary" variant="outlined" onClick={handleCancel}>Cancel</Button>
      <LoadingButton
        loading={isLoading}
        loadingPosition="start"
        color="primary"
        variant="contained"
        type="submit"
        startIcon={<SaveIcon />}
        disabled={disabled}
      >
        Save
      </LoadingButton>
    </Box>
  );
}

export default FormActions;
