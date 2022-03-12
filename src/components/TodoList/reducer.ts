import { Istate, ACTIONTYPE, IAction, Itodo } from './typings';

// action对应着不同类型的处理方法，定义
function todoReducer(state: Istate, action: IAction): Istate {
  const { type, payload } = action
  switch (type) {
    case ACTIONTYPE.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, payload as Itodo]
      }
    case ACTIONTYPE.REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== payload)
      }
    case ACTIONTYPE.TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map(todo => {
          return todo.id === payload ? {
            ...todo,
            completed: !todo.completed
          } : {
            ...todo
          }
        })
      }
    case ACTIONTYPE.INIT_TODOLIST:
      return {
        ...state,
        todoList: payload as Itodo[]
      }
    default:
      return state;
  }
}

export default todoReducer