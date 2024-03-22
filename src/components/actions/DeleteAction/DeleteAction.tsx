import React from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteActionProps {
  todoName: string;
  handleDeleteClick: (todoName: string) => () => Promise<void>;
}

const DeleteAction: React.FC<DeleteActionProps> = ({ todoName, handleDeleteClick }) => {
  return (
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteClick(todoName)}
      color="inherit"
    />
  );
};

export default DeleteAction;
