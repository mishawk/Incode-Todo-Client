import React from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteActionProps {
  id: number;
  handleDeleteClick: (id: number) => () => Promise<void>;
}

const DeleteAction: React.FC<DeleteActionProps> = ({ id,  handleDeleteClick }) => {
  return (
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteClick(id)}
      color="inherit"
    />
  );
};

export default DeleteAction;
