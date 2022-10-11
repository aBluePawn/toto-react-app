import { useState } from "react";

export function Form(props: {addTask: (name: string) => void}) {
  const [name, setName] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setName(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(name !== ''){
      props.addTask(name);
      setName('');
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    <h2 className="label-wrapper">
      <label htmlFor="new-todo-input" className="label__lg">
        What needs to be done?
      </label>
    </h2>
    <input
      type="text"
      id="new-todo-input"
      className="input input__lg"
      name="text"
      autoComplete="off"
      value={name}
      onChange={handleChange}
    />
    <button type="submit" className="btn btn__primary btn__lg">
      Add
    </button>
  </form>

  )
}
