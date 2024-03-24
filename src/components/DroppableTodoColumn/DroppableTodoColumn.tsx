import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Grid } from '@mui/material';
import React from 'react';
import TodoCard from '../TodoCard/TodoCard';
import AddTodoButton from '../buttons/AddTodoButton/AddTodoButton';
import { TodoStatus } from '../../types/TodoStatus';
import { CreateTodo, Todo } from '../../types/Todo';

interface DroppableTodoColumnProps {
  column: TodoStatus;
  todosFromServer: Todo[];
  editItemId: null;
  handleEdit: (taskId: any, title: any, description: any, status: any) => void;
  handleDelete: (taskId: any) => Promise<void>;
  handleSave: (taskId: any, title: any, status: any, description: any) => Promise<void>;
  setTodosFromServer: React.Dispatch<React.SetStateAction<Todo[]>>;
  boardId: string;
  setBoardId: React.Dispatch<React.SetStateAction<string>>;
  createTodo: (boardId: string, newTodo: CreateTodo) => Promise<Todo>;
}

const DroppableTodoColumn: React.FC<DroppableTodoColumnProps> = (props) => {

  const { 
    column, 
    todosFromServer, 
    editItemId, 
    handleEdit, 
    handleDelete, 
    handleSave, 
    setTodosFromServer,
    boardId,
    setBoardId,
    createTodo
  } = props;

  return (
    <Grid item xs={12} sm={6} md={4} key={column}>
      <h2 style={{ textAlign: 'center' }}>{column}</h2>
      <Droppable droppableId={column} key={column}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: '#f0f0f0',
              border: '1px solid #ccc',
              padding: '8px',
              borderRadius: '8px',
            }}
          >
            {todosFromServer.map((todo, index) => (
              todo.status === column && (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >

                      <TodoCard
                        todo={todo}
                        index={index}
                        editItemId={editItemId}
                        setTodosFromServer={setTodosFromServer}
                        handleSave={handleSave}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    </div>
                  )}
                </Draggable>
              )
            ))}

            {provided.placeholder}
            {column === 'ToDo' && (
              <AddTodoButton boardId={boardId} createTodo={createTodo} />
            )}
          </div>
        )}
      </Droppable>
    </Grid>
  );
}

export default DroppableTodoColumn;