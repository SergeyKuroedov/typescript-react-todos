import React, { useRef } from "react";
import "../../style.scss";

interface InputProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleForm: (e: React.FormEvent<EventTarget>) => void;
}

export const InputField: React.FC<InputProps> = ({
  todo,
  setTodo,
  handleForm
}): JSX.Element => {

    const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form action="" className="input" onSubmit={(e) => {
        handleForm(e)
        inputRef.current?.blur();
    }}>
      <input
        ref={inputRef}
        type="input"
        className="input__box"
        placeholder="Enter some todos"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input__button" type="submit">
        Go!
      </button>
    </form>
  );
};
