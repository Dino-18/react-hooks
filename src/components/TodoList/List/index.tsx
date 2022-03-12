import React, { FC, ReactElement } from 'react';
import Item from './item';
import { Itodo } from '../typings';

interface Iprops {
  todoList: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void
}

const List: FC<Iprops> = ({
  todoList,
  toggleTodo,
  removeTodo
}): ReactElement => {

  return (
    <div className='todo-list'>
      {
        todoList && todoList.map((todo: Itodo) => {
          return <Item
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        })}
    </div>
  )
}

export default List