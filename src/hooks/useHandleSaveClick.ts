import { GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import React, { useCallback } from 'react';

export const useHandleSaveClick = (setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>) => {
  return useCallback((id: GridRowId) => () => {
    setRowModesModel((prev: GridRowModesModel) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
  }, []);
};
