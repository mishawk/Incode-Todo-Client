import React, { useState } from 'react';
import { Paper, IconButton, Modal, Box, Typography, TextField, Button } from '@mui/material';
import { CreateTodo, Todo } from '../../../types/Todo';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoButtonProps {
  createTodo: (boardId: string, newTodo: CreateTodo) => Promise<Todo>;
  boardId: string;
}

const AddTodoButton = (props: AddTodoButtonProps) => {
  const { createTodo, boardId } = props;
  const [hovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newTodo, setNewTodo] = useState<CreateTodo>({ boardId, title: '', description: '' });
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTitleChange = (e) => {
    setNewTodo({ ...newTodo, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewTodo({ ...newTodo, description: e.target.value });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleCreateTodo = async () => {
    try {
      await createTodo(boardId, newTodo);
      handleCloseModal();
      setNewTodo({boardId, title: '', description: '' });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <>
      <Paper
        elevation={hovered ? 6 : 3}
        style={{ textAlign: 'center', marginTop: '16px', padding: 16 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenModal}
      >
        <IconButton aria-label="add">
          <AddIcon fontSize="large" />
        </IconButton>
      </Paper>

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
            Add New Todo
          </Typography>

          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newTodo.title}
            onChange={handleTitleChange}
            margin="normal"
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={newTodo.description}
            onChange={handleDescriptionChange}
            margin="normal"
          />
          
          <Button variant="contained" color="primary" onClick={handleCreateTodo} sx={{ mt: 2 }}>
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddTodoButton;
