import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { CreateTodo, Todo, UpdateTodo } from "../../types/Todo";
import { API_URL } from '../../utils/constants';
import { TodoStatus } from "../../types/TodoStatus";
import { Board } from "../../types/Board";

type Props = {
  children: React.ReactNode
};

interface TodoContextType {
  todosFromServer: Todo[],
  boardId: string,
  setBoardId: React.Dispatch<React.SetStateAction<string>>,
  fetchTodos: () => Promise<void>,
  setTodosFromServer: React.Dispatch<React.SetStateAction<Todo[]>>,
  createTodo: (boardId: string, newTodo: CreateTodo) => Promise<Todo>,
  deleteTodo: (id: number) => Promise<void>,
  updateTodo: (id: number, updateData: UpdateTodo) => Promise<Todo>,
  getBoard: (boardId: string) => Promise<string>,
  errors: null,
  setErrors: React.Dispatch<React.SetStateAction<null>>,
  createBoard:(board: Board) => Promise<Board>
}

export const TodoContext = createContext<TodoContextType>({
  todosFromServer: [],
  createTodo: function (boardId: string, newTodo: CreateTodo): Promise<Todo> {
    throw new Error("Function not implemented.");
  },
  deleteTodo: function (id: number): Promise<void> {
    throw new Error("Function not implemented.");
  },
  updateTodo: function (id: number, updateData: UpdateTodo): Promise<Todo> {
    throw new Error("Function not implemented.");
  },
  setTodosFromServer: function (value: React.SetStateAction<Todo[]>): void {
    throw new Error("Function not implemented.");
  },
  getBoard: function (boardId: string): Promise<string> {
    throw new Error("Function not implemented.");
  },
  boardId: "",
  setBoardId: function (value: React.SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
  fetchTodos: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  errors: null,
  setErrors: function (value: React.SetStateAction<null>): void {
    throw new Error("Function not implemented.");
  },
  createBoard: function (board: Board): Promise<Board> {
    throw new Error("Function not implemented.");
  }
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [boardId, setBoardId] = useState('');
  const [errors, setErrors] = useState(null);

  const fetchTodos = async () => {
    try {
      const result = await fetch(`${API_URL}/todos/getAllTodos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boardId }),
      });
  
      if (!result.ok) {
        throw new Error('Failed to fetch todos');
      }
  
      const data = await result.json();
      setTodosFromServer(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setErrors(error.message);
    }
  };
  
  const getBoard = async (boardId: string): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/boards/getBoard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boardId} ),
      });
  
      if (!response.ok) {
        throw new Error('Failed to get a board');
      }
  
      const board: Board = await response.json();
  
      return board.boardId;
    } catch (error) {
      console.error('Error creating todo:', error);
      setErrors(error.message);
      throw error;
    }
  }

  const createTodo = async (boardId: string, newTodo: CreateTodo): Promise<Todo> => {
    try {
      const response = await fetch(`${API_URL}/todos/createTodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({boardId, title: newTodo.title, description: newTodo.description }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
  
      const createdTodo: Todo = await response.json();
      setTodosFromServer((prevTodos) => [...prevTodos, createdTodo]);
      
      return createdTodo;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  };

  const createBoard = async (board: Board): Promise<Board> => {
    try {
      const response = await fetch(`${API_URL}/boards/createBoard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create board');
      }
  
      const createdBoard: Board = await response.json();
      
      return createdBoard;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/todos/deleteTodo/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodosFromServer((prevTodos) => prevTodos.filter(todo => todo.id !== id));

    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id: number, updateData: UpdateTodo): Promise<Todo> => {
    try {
      const response = await fetch(`${API_URL}/todos/updateTodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, updateData }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo status');
      }

      const todo = await response.json();
      return todo;

    } catch (error) {
      console.error('Error updating todo status:', error);
      throw error;
    }
  };


  const value = useMemo(() => ({
    todosFromServer,
    setTodosFromServer,
    createTodo,
    deleteTodo,
    updateTodo,
    getBoard,
    boardId,
    setBoardId,
    fetchTodos,
    errors,
    setErrors,
    createBoard
  }),
    [
      todosFromServer,
      createTodo,
      deleteTodo,
      updateTodo,
      setTodosFromServer,
      setTodosFromServer,
      getBoard,
      boardId,
      setBoardId,
      fetchTodos,
      errors,
      setErrors,
      createBoard
    ]);

  return <TodoContext.Provider value={value}>
    {children}
  </TodoContext.Provider>;
}

