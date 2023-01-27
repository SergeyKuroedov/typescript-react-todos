import { DropResult } from "react-beautiful-dnd";
import { Todo } from "../../interfaces/interfaces";

export class DragAndDrop {
  constructor(
    public droppable: string,
    public todos: Todo[],
    public completedTodos: Todo[],
    public setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    public setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) {}

  onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    let active = this.todos;
    let complete = this.completedTodos;

    if (source.droppableId === this.droppable) {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === this.droppable) {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    this.setCompletedTodos(complete);
    this.setTodos(active);
  };
}
