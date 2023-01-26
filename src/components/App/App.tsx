import React, { useState } from "react";
import { InputField } from "../InputField/InputField";
import "../../style.scss";
import { Todo } from "../../models";
import { TodoList } from "../TodoList/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

      let add;
      let active = todos;
      let complete = completedTodos;

      if (source.droppableId === "TodosList") {
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }

      if (destination.droppableId === "TodosList") {
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }
  
      setCompletedTodos(complete);
      setTodos(active);
    };

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
