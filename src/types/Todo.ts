import { TodoStatus } from './TodoStatus';

export interface Todo {
  id: string;
  name: string;
  description: string;
  status: TodoStatus;
}

export interface CreateTodo {
  name: string;
  description: string;
}

export interface UpdateTodo {
  name: string;
  status: TodoStatus;
}