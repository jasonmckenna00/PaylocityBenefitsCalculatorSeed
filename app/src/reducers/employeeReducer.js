import { SELECT_DEPENDENT, DESELECT_DEPENDENT, REMOVE_DEPENDENT, ADD_DEPENDENT } from "../actions/DependentActions"
import { GET_All_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE, REMOVE_EMPLOYEE, SELECT_EMPLOYEE, DESELECT_EMPLOYEE } from "../actions/EmployeeActions"


export const employeeReducer = function (state = [], action){
  Object.freeze(state)
  switch(action.type){
    case GET_All_EMPLOYEES:
      return action.payload.data
    case ADD_EMPLOYEE:
      return [...state, action.payload.data]
    case UPDATE_EMPLOYEE:
      const filtered = state.filter(x=> x.id !== action.payload.data.id)
      return [action.payload.data, ...filtered]
    case REMOVE_EMPLOYEE:
      const removed = state.filter(x=> x.id !== action.payload.data.id)
      return removed
    case ADD_DEPENDENT:
      const employee = state.find(x=> x.id === action.payload.data.employeeId)
      employee.dependents.push(action.payload.data)
      const oldState = state.filter(x=> x.id !== action.payload.data.employeeId)
      return [employee, ...oldState,]
    case REMOVE_DEPENDENT:
      const targetEmp = state.find(x=> x.id === action.payload.data.employeeId)
      const newDeps = targetEmp.dependents.filter(x=>x.id !== action.payload.data.id)
      targetEmp.dependents = newDeps
      
      return [targetEmp, ...state.filter(x=> x.id !== action.payload.data.employeeId)]

    default: return state
  }
}

export const selectedEmployeeReducer = function (state = null, action){
  Object.freeze(state)
  switch(action.type){
    case SELECT_EMPLOYEE:
      return action.payload
    case DESELECT_EMPLOYEE:
      return null
    case SELECT_DEPENDENT:
      return state
    case DESELECT_DEPENDENT:
      return state
    case REMOVE_DEPENDENT:
      return state
    default: return state
  }
}