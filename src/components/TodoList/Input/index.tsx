import React, { useRef, FC, ReactElement } from "react";
import { Itodo } from '../typings';

interface Iprops {
  addTodo: (todo: Itodo) => void;
  todoList: Itodo[];
}

const Input: FC<Iprops> = ({
  addTodo,
  todoList
}): ReactElement => {

  const InputRef = useRef<HTMLInputElement>(null);

  // 先判断input的值是否为空
  const addItem = (): void => {
    const val: string = InputRef.current!.value.trim();

    if (val.length) {
      const isExit = todoList.find(todo => todo.content === val)

      if (isExit) {
        alert('已存在该项')
        return
      }

      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false,
      })

      // 将input的内容清空
      InputRef.current!.value = ''
    }
  }

  return (
    <div className='todo-input'>
      <input type="text" placeholder="请输入代办项" ref={InputRef} />
      <button onClick={addItem}>增加</button>
    </div>

  )
}

export default Input;