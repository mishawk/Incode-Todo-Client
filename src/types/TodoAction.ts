import { Todo } from "./Todo";
import { TodoStatus } from "./TodoStatus";

interface TodoFetchSuccessAction {
  type: 'TODO_FETCH_SUCCESS';
  payload: Todo[];
}

interface TodoCreateSuccessAction {
  type: 'TODO_CREATE_SUCCESS';
  payload: Todo;
}

interface TodoDeleteSuccessAction {
  type: 'TODO_DELETE_SUCCESS';
  payload: string;
}

interface TodoUpdateSuccessAction {
  type: 'TODO_UPDATE_SUCCESS';
  payload: { id: string; status: TodoStatus; };
}

export type TodoAction =
  | TodoFetchSuccessAction
  | TodoCreateSuccessAction
  | TodoDeleteSuccessAction
  | TodoUpdateSuccessAction;
