import { GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import React, { useCallback } from 'react';

export const useHandleCancelClick = (setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>) => {
  return useCallback((id: GridRowId) => () => {
    const stringId = id.toString();
    
    setRowModesModel((prev: GridRowModesModel) => ({
      ...prev,
      [stringId]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  }, []);
};
