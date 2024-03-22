import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { CreateTodo, Todo } from "../../types/Todo";
import { API_URL } from '../../utils/constants';
import { TodoStatus } from "../../types/TodoStatus";

type Props = {
  children: React.ReactNode
};

interface TodoContextType {
  todosFromServer: Todo[],
  setTodosFromServer: React.Dispatch<React.SetStateAction<Todo[]>>,
  fetchTodos: () => Promise<void>,
  createTodo: (newTodo: CreateTodo) => Promise<Todo>,
  deleteTodo: (todoName: string) => Promise<void>,
  updateTodo: (id: string, todoName: string, newStatus: TodoStatus) => Promise<void>
}

export const TodoContext = createContext<TodoContextType>({
  todosFromServer: [],
  createTodo: function (newTodo: CreateTodo): Promise<Todo> {
    throw new Error("Function not implemented.");
  },
  deleteTodo: function (todoName: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  updateTodo: function (id: string, todoName: string, newStatus: TodoStatus): Promise<void> {
    throw new Error("Function not implemented.");
  },
  fetchTodos: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  setTodosFromServer: function (value: React.SetStateAction<Todo[]>): void {
    throw new Error("Function not implemented.");
  }
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const result = await fetch(`${API_URL}/todos/getAllTodos`);
    const data = await result.json();
    setTodosFromServer(data);
  }
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (newTodo: CreateTodo): Promise<Todo> => {
    try {
      const response = await fetch(`${API_URL}/todos/createTodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
  
      const createdTodo: Todo = await response.json();
      setTodosFromServer((prevTodos) => [...prevTodos, createdTodo]);
      
      return createdTodo; // Ensure to return the created todo
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  };

  const deleteTodo = async (todoName: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/todos/deleteTodo/${todoName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodosFromServer((prevTodos) => prevTodos.filter(todo => todo.name !== todoName));

    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id: string, todoName: string, newStatus: TodoStatus): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/todos/updateTodo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, name: todoName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo status');
      }

    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };


  const value = useMemo(() => ({
    todosFromServer,
    setTodosFromServer,
    createTodo,
    deleteTodo,
    updateTodo,
    fetchTodos,
  }),
    [
      todosFromServer,
      createTodo,
      deleteTodo,
      updateTodo,
      setTodosFromServer,
      fetchTodos,
      setTodosFromServer,
    ]);

  return <TodoContext.Provider value={value}>
    {children}
  </TodoContext.Provider>;
}

