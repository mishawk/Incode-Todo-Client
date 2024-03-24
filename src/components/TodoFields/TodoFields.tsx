import { TextField } from "@mui/material";
import React from "react";
import { Todo } from "../../types/Todo";

interface TodoFieldsProps {
  todo: Todo;
  index: number;
  editItemId: number | null;
  setTodosFromServer: React.Dispatch<React.SetStateAction<Todo[]>>; 
}

const TodoFields: React.FC<TodoFieldsProps> = (props) => {
  const { todo, index, editItemId, setTodosFromServer } = props;

  const updateField = (field, e) => {
    setTodosFromServer((prevData) => {
      const newData = [...prevData];
      newData[index][field] = e.target.value;
      return newData;
    });
  };

  return (
    <>
      <TextField
        fullWidth
        label="Task Title"
        variant="outlined"
        value={todo.title}
        onChange={(e) => updateField('title', e)}
        disabled={editItemId !== todo.id}
      />

      <TextField
        fullWidth
        label="Task Description"
        variant="outlined"
        multiline
        rows={4}
        value={todo.description}
        onChange={(e) => updateField('description', e)}
        disabled={editItemId !== todo.id}
        style={{ marginTop: '8px' }}
      />
    </>
  );
};

export default TodoFields;