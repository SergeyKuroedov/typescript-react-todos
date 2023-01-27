export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
  }

export interface InputProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleForm: (e: React.FormEvent<EventTarget>) => void;
}

export interface TodoProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }
  