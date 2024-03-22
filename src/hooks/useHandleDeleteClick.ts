import React, { useCallback } from 'react';
import { Todo } from '../types/Todo';

export const useHandleDeleteClick = (
  todosFromServer: Todo[],
  setTodosFromServer: React.Dispatch<React.SetStateAction<Todo[]>>,
  deleteTodo: (todoName: string) => Promise<void>
  ) => {
  return useCallback((todoName: string) => async () => {
    try {
      const todoToDelete = todosFromServer.find(todo => todo.name === todoName);
  
      if (!todoToDelete) {
        console.error('Todo not found:', todoName);
        return;
      }
  
      await deleteTodo(todoToDelete.name);
  
      setTodosFromServer((prevTodos) => prevTodos.filter(todo => todo.id !== todoToDelete.id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, [todosFromServer, setTodosFromServer, deleteTodo]);
};