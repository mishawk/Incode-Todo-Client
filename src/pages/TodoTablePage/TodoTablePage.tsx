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
import { Button, Container, Fade, Grid, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext/TodoContext';
import { getColumns } from '../../components/TodoColumns/TodoColumns';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import { useHandleCancelClick } from '../../hooks/useHandleCancelClick';
import { useHandleDeleteClick } from '../../hooks/useHandleDeleteClick';
import { useHandleEditClick } from '../../hooks/useHandleEditClick';
import { useHandleSaveClick } from '../../hooks/useHandleSaveClick';
import { CustomNoRowsOverlay } from '../../components/CustomNoRowsOverlay/CustomNoRowsOverlay';
import { CustomPagination } from '../../components/CustomPagination/CustomPagination';
import WaitLogo from '../../assets/wait.svg?react';
import { AddBoardModal } from '../../components/AddBoardModel/AddBoardModel';

const PAGE_SIZE = 5;

export function TodoTablePage() {
  const {
    todosFromServer,
    createTodo,
    deleteTodo,
    updateTodo,
    setTodosFromServer,
    fetchTodos,
    boardId,
    setBoardId,
    getBoard
  } = useContext(TodoContext);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [openModal, setOpenModal] = useState(false);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };


  const handleLoadButtonClick = async () => {
    try {
      await fetchTodos();
      await getBoard(boardId);
      setIsFetchSuccessful(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };


  const processRowUpdate = async (newRow: GridRowModel) => {
    try {

      const todoToUpdate = todosFromServer.find(todo => todo.id === newRow.id);

      if (!todoToUpdate) {
        console.error('Todo not found:', newRow.title);
        return;
      }

      console.log(todoToUpdate!.id);

      await updateTodo(todoToUpdate!.id,
        {
          title: newRow.title,
          status: newRow.status,
          description: newRow.description,
        }
      );

      const updatedTodos = todosFromServer.map(todo =>
        todo.id === todoToUpdate.id ?
          {
            ...todo,
            status: newRow.status,
            title: newRow.title,
            description: newRow.description
          }
          : todo
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
              label="Enter a Board ID here..."
              variant="outlined"
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ height: '56px', marginLeft: 8 }}
              onClick={handleLoadButtonClick}
            >
              Load
            </Button>

            <Box marginLeft={2}>
              <Button
                variant="contained"
                color="primary"
                style={{ height: '56px' }}
                onClick={handleOpenModal}
              >
                Add Board
              </Button>
            </Box>
            <AddBoardModal
              openModal={openModal}
              setOpenModal={setOpenModal}
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
        {isFetchSuccessful && (
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
          rows={todosFromServer}
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
            toolbar: { createTodo, boardId, getBoard },
          }}
          pagination
          autoPageSize
        />
      )}
      {!isFetchSuccessful && (
          <Box textAlign="center" mt={4}>
            <Fade in={true} timeout={1000}>
              <Typography variant="h5">
                Enter Board ID
              </Typography>
            </Fade>
            <WaitLogo style={{ width: '200px', height: '200px', marginTop: '20px' }} />
          </Box>
        )}
      </Box>

    </Container>
  );
}