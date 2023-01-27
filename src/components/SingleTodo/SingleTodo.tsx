import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../../interfaces/interfaces";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface SingleProps {
  index: number;
  id: number;
  todo: string;
  isDone: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

const SingleTodo: React.FC<SingleProps> = ({
  id,
  todo,
  isDone,
  setTodos,
  todos,
  index,
}): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit((prev) => !prev);
  };

  const handleEditChange = () => {
    if (!edit && !isDone) {
      setEdit((prev) => !prev);
    }
  };


  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'dragging':""}`}
          onSubmit={(e) => handleEdit(e, id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              type="text"
              className="todos__single--text todos_input"
            />
          ) : isDone ? (
            <s className="todos__single--text">{todo}</s>
          ) : (
            <span className="todos__single--text">{todo}</span>
          )}

          <div className="todos__icons">
            <span className="todos__icon--edit" onClick={handleEditChange}>
              <AiFillEdit />
            </span>
            <span
              className="todos__icon--delete"
              onClick={() => handleDelete(id)}
            >
              <AiFillDelete />
            </span>
            <span className="todos__icon--done" onClick={() => handleDone(id)}>
              <MdOutlineDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
