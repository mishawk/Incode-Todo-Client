import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import React from 'react';

interface SaveActionProps {
  id: GridRowId;
  handleSaveClick: (id: GridRowId) => () => void;
}

const SaveAction: React.FC<SaveActionProps> = ({ id, handleSaveClick }) => {
  return (
    <GridActionsCellItem
      icon={<SaveIcon />}
      label="Save"
      sx={{
        color: 'primary.main',
      }}
      onClick={handleSaveClick(id)}
    />
  );
};

export default SaveAction;