import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function ProfileImage({
  imageSrc,
  imageAlt,
  selectedImage,
  selectImage,
  removeImage,
}) {
  const showAvatar = selectedImage === imageSrc;

  return (
    <Stack alignItems="center">
      <Avatar
        alt={imageAlt}
        src={showAvatar ? imageSrc : ''}
        sx={{ width: 150, height: 150, my: 2 }}
      />

      {showAvatar ? (
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={removeImage}>Delete</Button>
      ) : (
        <>
          {selectedImage ? <p>{`./${selectedImage.name}`}</p> : null}
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload image
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={selectImage}
            />
          </Button>
        </>
      )}
    </Stack>
  );
}

export default ProfileImage;
