import React, { FC, ReactElement, useCallback, useReducer, useEffect } from 'react';
import List from './List';
import Input from './Input';
import { Itodo, ACTIONTYPE } from './typings';
import todoReducer from './reducer';


const TodoList: FC = (): ReactElement => {

  // initialState的惰性初始化
  function init(initTodoList: Itodo[]) {
    return {
      todoList: initTodoList
    }
  }

  const [state, dispatch] = useReducer(todoReducer, [], init)
  // 子组件里的函数是父组件传递的时候，最好使用useCallback包裹以优化性能

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todolist') || '[]')
    dispatch({
      type: ACTIONTYPE.INIT_TODOLIST,
      payload: todoList
    })
  }, []) // 注意这里不能依赖state.todoList（因为只需要初始化一次）

  // 每次操作完就讲新的state保存到localStorage中
  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(state.todoList))
  }, [state.todoList])

  // 三种方法由父组件统一传递
  const addTodo = useCallback((todo: Itodo): void => {
    dispatch({
      type: ACTIONTYPE.ADD_TODO,
      payload: todo
    })
  }, [])

  const toggleTodo = useCallback((id: number): void => {
    dispatch({
      type: ACTIONTYPE.TOGGLE_TODO,
      payload: id
    })
  }, [])

  const removeTodo = useCallback((id: number): void => {
    dispatch({
      type: ACTIONTYPE.REMOVE_TODO,
      payload: id
    })
  }, [])

  return (
    <div className="todos">
      <Input
        addTodo={addTodo}
        todoList={state.todoList}
      />
      <List
        todoList={state.todoList}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </div>
  )
}

export default TodoList;