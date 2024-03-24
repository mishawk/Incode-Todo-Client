import { Alert, AlertColor, Box, Button, Modal, Snackbar, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Board } from "../../types/Board";
import { TodoContext } from "../../contexts/TodoContext/TodoContext";

interface AddBoardModalProps {
  openModal: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>

}

export const AddBoardModal: React.FC<AddBoardModalProps> = (props) => {
  const { createBoard } = useContext(TodoContext);
  const { openModal, setOpenModal } = props;

  const [newBoard, setNewBoard] = useState<Board>({ boardId: '', boardName: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBoardIdChange = (e) => {
    setNewBoard({ ...newBoard, boardId: e.target.value });
  };

  const handleBoardNameChange = (e) => {
    setNewBoard({ ...newBoard, boardName: e.target.value });
  };

  const handleCreateBoard = async () => {
    if (!newBoard.boardId || !newBoard.boardName) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Both ID and name must be provided.');
      setSnackbarOpen(true);
      return;
    }

    try {
      console.log(newBoard.boardId, newBoard.boardName);
      await createBoard(newBoard);
      handleCloseModal();
      setNewBoard({ boardId: '', boardName: '' });
      setSnackbarSeverity('success');
      setSnackbarMessage('Board added successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error creating board:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error creating board. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Add New Board
          </Typography>

          <TextField
            label="Board Name"
            variant="outlined"
            fullWidth
            value={newBoard.boardName}
            onChange={handleBoardNameChange}
            margin="normal"
          />

          <TextField
            label="Board ID"
            variant="outlined"
            fullWidth
            value={newBoard.boardId}
            onChange={handleBoardIdChange}
            margin="normal"
          />

          <Button variant="contained" color="primary" onClick={handleCreateBoard} sx={{ mt: 2 }}>
            Add
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};