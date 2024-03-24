import React, { useCallback } from 'react';
import { Todo } from '../types/Todo';

export const useHandleDeleteClick = (
  todosFromServer: Todo[],
  setTodosFromServer: React.Dispatch<React.SetStateAction<Todo[]>>,
  deleteTodo: (id: number) => Promise<void>
  ) => {
  return useCallback((id: number) => async () => {
    try {
      const todoToDelete = todosFromServer.find(todo => todo.id === id);
  
      if (!todoToDelete) {
        console.error('Todo not found:', id);
        return;
      }
  
      await deleteTodo(todoToDelete.id);
  
      setTodosFromServer((prevTodos) => prevTodos.filter(todo => todo.id !== todoToDelete.id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, [todosFromServer, setTodosFromServer, deleteTodo]);
};