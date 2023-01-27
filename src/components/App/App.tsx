import React, { useState } from "react";
import { InputField } from "../InputField/InputField";
import "../../style.scss";
import { Todo } from "../../interfaces/interfaces";
import { TodoList } from "../TodoList/TodoList";
import { DragDropContext } from "react-beautiful-dnd";
import { DragAndDrop } from "../../utlls/DnD/DragAndDrop";

const App: React.FC = (): JSX.Element => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleForm = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const {onDragEnd} = new DragAndDrop('TodosList', todos, completedTodos, setCompletedTodos,setTodos)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className="app__logo">TODOS</span>
        <InputField todo={todo} setTodo={setTodo} handleForm={handleForm} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
