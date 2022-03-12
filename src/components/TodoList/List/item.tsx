import React, { FC, ReactElement } from 'react';
import { Itodo } from '../typings';

interface Iprops {
  todo: Itodo,
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const Item: FC<Iprops> = ({
  todo,
  toggleTodo,
  removeTodo
}): ReactElement => {
  const { id, content, completed } = todo
  return (
    <div className='todo-list'>
      <input type="checkbox" checked={completed} onChange={() => {
        toggleTodo(id)
      }} />
      <span style={{ textDecoration: completed ? 'line-through' : '' }}>
        {content}
      </span>
      <button onClick={() => removeTodo(id)}>删除</button>
    </div>
  )
}

export default Item