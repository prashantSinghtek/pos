import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DeleteConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography
          id="delete-modal-description"
          sx={{ mt: 2, mb: 4 }}
          variant="body1"
        >
          Are you sure you want to delete this party? This action cannot be
          undone.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" color="error" onClick={handleConfirm}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
