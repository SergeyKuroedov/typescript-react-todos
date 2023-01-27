import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo, TodoProps} from "../../interfaces/interfaces";
import SingleTodo from "../SingleTodo/SingleTodo";


export const TodoList: React.FC<TodoProps> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}): JSX.Element => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos complete ${snapshot.isDraggingOver ? 'drag': ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map(
              (todo: Todo, index: number): JSX.Element => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  {...todo}
                  setTodos={setTodos}
                  todos={todos}
                />
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${snapshot.isDraggingOver ? 'dragged': ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map(
              (todo: Todo, index: number): JSX.Element => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  {...todo}
                  setTodos={setCompletedTodos}
                  todos={completedTodos}
                />
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
