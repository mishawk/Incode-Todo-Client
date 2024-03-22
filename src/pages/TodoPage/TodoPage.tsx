import * as React from 'react';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container, Grid, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext/TodoContext';
import { getColumns } from '../../components/TodoColumns/TodoColumns';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import {useHandleCancelClick } from '../../hooks/useHandleCancelClick';
import {useHandleDeleteClick } from '../../hooks/useHandleDeleteClick';
import {useHandleEditClick } from '../../hooks/useHandleEditClick';
import {useHandleSaveClick } from '../../hooks/useHandleSaveClick';
import { CustomNoRowsOverlay } from '../../components/CustomNoRowsOverlay/CustomNoRowsOverlay';
import { CustomPagination } from '../../components/CustomPagination/CustomPagination';

const PAGE_SIZE = 5;

export function TodoPage() {
  const { 
    todosFromServer, 
    createTodo, 
    deleteTodo, 
    updateTodo,
    setTodosFromServer,
  } = useContext(TodoContext);
  const [todoName, setTodoName] = useState('');
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  

  const filteredTodos = todosFromServer.filter(todo => todo.name.toLowerCase()
    .includes(todoName.toLowerCase()));
  
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleChange = (event) => {
    setTodoName(event.target.value);
  };
  
  const processRowUpdate = async (newRow: GridRowModel) => {
    try {
      const todoToUpdate = todosFromServer.find(todo => todo.id === newRow.id);
  
      if (!todoToUpdate) {
        console.error('Todo not found:', newRow.name);
        return;
      }
  
      await updateTodo(todoToUpdate.id, newRow.name, newRow.status);
  
      const updatedTodos = todosFromServer.map(todo =>
        todo.id === todoToUpdate.id ? { ...todo, status: newRow.status, name: newRow.name } : todo
      );
      setTodosFromServer(updatedTodos);
  
      const updatedRow = { ...newRow, isNew: false };
  
      return updatedRow;
    } catch (error) {
      console.error('Error updating todo status:', error);
      throw error;
    }
  };
  
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  

  const columns: GridColDef[] = getColumns(
    todosFromServer, 
    rowModesModel, 
    useHandleSaveClick(setRowModesModel), 
    useHandleCancelClick(setRowModesModel), 
    useHandleEditClick(setRowModesModel),
    useHandleDeleteClick(todosFromServer, setTodosFromServer, deleteTodo)
  );

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="baseline" marginBottom={2}>
            <TextField
              fullWidth
              label="Enter a todo Name here..."
              variant="outlined"
              value={todoName}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>

        <Box
          sx={{
            height: 500,
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            sx={{
              '& .MuiDataGrid-root': {
                backgroundColor: 'background.default',
              },
              '& .MuiDataGrid-cell': {
                color: 'text.primary',
                borderColor: 'divider',
              },
              '& .MuiDataGrid-columnHeader': {
                color: 'text.primary',
                backgroundColor: 'background.paper',
                borderColor: 'divider',
              },
            }}
            rows={filteredTodos}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[PAGE_SIZE]}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              pagination: CustomPagination,
              toolbar: AddTodo,

            }}
            slotProps={{
              toolbar: { createTodo },
            }}
            pagination
            autoPageSize
          />
        </Box>

    </Container>
  );
}