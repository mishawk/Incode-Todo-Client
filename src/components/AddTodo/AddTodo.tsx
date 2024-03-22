import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import { CreateTodo, Todo } from "../../types/Todo";
import AddIcon from '@mui/icons-material/Add';

interface AddTodoProps {
  createTodo: (newTodo: CreateTodo) => Promise<Todo>;
}

export function AddTodo(props: AddTodoProps) {
  const { createTodo } = props;
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<CreateTodo>({ name: '', description: '' });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      name: event.target.value,
    });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      description: event.target.value,
    });
  };

  const handleCreateTodo = async () => {
    try {
      await createTodo(newTodo);
      handleClose();
      setNewTodo({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
        Add Todo
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
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
            label="Name"
            variant="outlined"
            fullWidth
            value={newTodo.name}
            onChange={handleNameChange}
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
    </GridToolbarContainer>
  );
}
