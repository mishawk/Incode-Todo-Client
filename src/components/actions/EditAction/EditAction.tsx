import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

interface EditActionProps {
  id: GridRowId;
  handleEditClick: (id: GridRowId) => () => void;
}

const EditAction: React.FC<EditActionProps> = ({ id, handleEditClick }) => {
  return (
    <GridActionsCellItem
      icon={<EditIcon />}
      label="Edit"
      className="textPrimary"
      onClick={handleEditClick(id)}
      color="inherit"
    />
  );
};

export default EditAction;
