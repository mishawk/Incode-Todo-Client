import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import CancelIcon from '@mui/icons-material/Close';
import React from 'react';


interface CancelActionProps {
  id: GridRowId;
  handleCancelClick: (id: GridRowId) => () => void
}

const CancelAction: React.FC<CancelActionProps> = ({ id, handleCancelClick }) => {
  return (
    <GridActionsCellItem
      icon={<CancelIcon />}
      label="Cancel"
      className="textPrimary"
      onClick={handleCancelClick(id)}
      color="inherit"
    />
  );
};

export default CancelAction;