export interface Itodo {
  id: number;
  content: string;
  completed: boolean;
}

export interface Istate {
  // type: string,
  todoList: Itodo[],
}

export interface IAction {
  type: ACTIONTYPE,
  payload: Itodo | number | Itodo[]
}

// 定义枚举
export enum ACTIONTYPE {
  ADD_TODO = 'addTodo',
  REMOVE_TODO = 'removeTodo',
  TOGGLE_TODO = 'toggle',
  INIT_TODOLIST = 'initTodolist'
}