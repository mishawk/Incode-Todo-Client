import React, { ChangeEvent } from 'react'
import { Card, CardContent, TextField, IconButton } from '@mui/material';
import { Todo } from '../../types/Todo';
import TodoActions from '../actions/TodoActions/TodoActions';
import TodoFields from '../TodoFields/TodoFields';

interface TodoCardProps {
  todo: Todo;
  editItemId: number | null;
  handleSave: (id: number, title: string, status: string, description: string) => void;
  handleEdit: (id: number, title: string, description: string, status: string) => void;
  handleDelete: (id: number) => void;
  index: number;
  setTodosFromServer: (value: React.SetStateAction<Todo[]>) => void;
}

const TodoCard: React.FC<TodoCardProps> = (props) => {
  const {
    todo,
    index,
    editItemId,
    setTodosFromServer,
    handleSave,
    handleEdit,
    handleDelete
  } = props;

  return (
    <Card key={todo.id} elevation={3} style={{ padding: 16, marginBottom: '8px' }}>
      <CardContent>
        <TodoFields
          todo={todo}
          index={index}
          editItemId={editItemId}
          setTodosFromServer={setTodosFromServer}
        />

        <TodoActions
          todo={todo}
          editItemId={editItemId}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

      </CardContent>
    </Card>
  );
}

export default TodoCard;
