import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Todo } from "../../../types/Todo";

interface TodoActionsProps {
  todo: Todo;
  editItemId: number | null;
  handleSave: (id: number, title: string, status: string, description: string) => void;
  handleEdit: (id: number, title: string, description: string, status: string) => void;
  handleDelete: (id: number) => void;
}


const TodoActions: React.FC<TodoActionsProps> = (props) => {
  const { todo, editItemId, handleSave, handleEdit, handleDelete } = props;

  return (
    <div style={{ textAlign: 'right', marginTop: '8px' }}>
      {editItemId === todo.id ? (
        <IconButton
          aria-label="save"
          onClick={() => handleSave(todo.id, todo.title, todo.status, todo.description)}
          color="primary"
        >
          Save
        </IconButton>
      ) : (
        <IconButton 
          aria-label="edit" 
          onClick={() => handleEdit(todo.id, todo.title, todo.description, todo.status)}
        >
          <EditIcon />
        </IconButton>
      )}
      <IconButton aria-label="delete" onClick={() => handleDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TodoActions;