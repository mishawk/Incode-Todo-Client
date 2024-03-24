import { TodoStatus } from './TodoStatus';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  boardId: string;
}

export interface CreateTodo {
  boardId: string;
  title: string;
  description: string;
}

export interface UpdateTodo {
  title?: string;
  status?: TodoStatus;
  description?: string;
}