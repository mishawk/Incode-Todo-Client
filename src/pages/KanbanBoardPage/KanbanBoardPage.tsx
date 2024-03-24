/// <reference types="vite-plugin-svgr/client"/>
import React, { useState, useContext } from 'react';
import { Container, Grid, Box, Snackbar, Alert, Typography, Fade } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TodoContext } from '../../contexts/TodoContext/TodoContext';
import { TodoStatus } from '../../types/TodoStatus';
import BoardLoader from '../../components/BoardLoader/BoardLoader';
import DroppableTodoColumn from '../../components/DroppableTodoColumn/DroppableTodoColumn';
import WaitLogo from '../../assets/wait.svg?react';


const KanbanBoard = () => {
  const {
    todosFromServer,
    createTodo,
    deleteTodo,
    updateTodo,
    fetchTodos,
    boardId,
    setBoardId,
    getBoard,
    errors,
    setErrors,
    setTodosFromServer,
    createBoard
  } = useContext(TodoContext);
  const [editItemId, setEditItemId] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);


  const handleEdit = (taskId, title, description, status) => {
    setEditItemId(taskId);
  };

  const handleSave = async (taskId, title, status, description) => {
    try {
      const todoToUpdate = todosFromServer.find(todo => todo.id === parseInt(taskId));

      if (!todoToUpdate) {
        console.error('Todo not found:', title);
        return;
      }

      await updateTodo(todoToUpdate.id,
        {
          title,
          status,
          description,
        }
      );

      const updatedTodos = todosFromServer.map(todo =>
        todo.id === todoToUpdate.id ?
          {
            ...todo,
            title,
            status,
            description,
          }
          : todo
      );
      setTodosFromServer(updatedTodos);
      setEditItemId(null);
    } catch {

    }
  };

  const handleDelete = async (taskId) => {
    try {
      const taskToDelete = todosFromServer.find((todo) => todo.id === taskId);

      if (!taskToDelete) {
        console.error('Task not found with id:', taskId);
        return;
      }

      await deleteTodo(taskToDelete.id);

      setTodosFromServer((prevTodos) => prevTodos.filter(todo => todo.id !== taskId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  const handleLoadButtonClick = async () => {
    try {
      await fetchTodos();
      await getBoard(boardId);
      setIsFetchSuccessful(true);
    } catch (error) {
      console.error('Error:', error);
      setIsFetchSuccessful(false);
      setErrors(error.message);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const draggedItemId = result.draggableId;
      const destinationColumn = destination.droppableId;
      const newStatus = destination.droppableId;

      try {
        const todo = todosFromServer.find(todo => todo.id === parseInt(draggedItemId));
        const title = todo!.title;


        await updateTodo(todo!.id, { status: newStatus });

        const updatedTasks = todosFromServer.map((todo) =>
          String(todo.id) === draggedItemId ? { ...todo, status: destinationColumn } : todo
        );

        setTodosFromServer(updatedTasks);

      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    } else {

    }
  }


  return (
    <Container>

      <BoardLoader
        boardId={boardId}
        setBoardId={setBoardId}
        handleLoadButtonClick={handleLoadButtonClick}
      />

      <Grid item xs={12}>
        {isFetchSuccessful && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={2}>
              {Object.values(TodoStatus).map((column) => (
                <DroppableTodoColumn
                  key={column}
                  column={column}
                  todosFromServer={todosFromServer}
                  editItemId={editItemId}
                  setTodosFromServer={setTodosFromServer}
                  handleSave={handleSave}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  boardId={boardId}
                  setBoardId={setBoardId}
                  createTodo={createTodo}
                />
              ))}
            </Grid>
          </DragDropContext>
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
      </Grid>

      {errors && (
        <Snackbar open={true} autoHideDuration={3000} onClose={() => setErrors(null)}>
          <Alert onClose={() => setErrors(null)} severity="error">
            {errors}
          </Alert>
        </Snackbar>
      )}

    </Container>
  );
};

export default KanbanBoard;
