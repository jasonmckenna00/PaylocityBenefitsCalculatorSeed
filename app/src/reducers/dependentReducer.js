import { SELECT_DEPENDENT, DESELECT_DEPENDENT, GET_All_DEPENDENTS, ADD_DEPENDENT, UPDATE_DEPENDENT, REMOVE_DEPENDENT } from "../actions/DependentActions";
import _ from "lodash";
import { REMOVE_EMPLOYEE } from "../actions/EmployeeActions";



export const dependentReducer = function (state = [], action){
  Object.freeze(state)
  switch(action.type){
    case GET_All_DEPENDENTS:
      return action.payload.data
    case ADD_DEPENDENT:
      return [...state, action.payload.data]
    case UPDATE_DEPENDENT:
      const filtered = state.filter(x=> x.id !== action.payload.data.id)
      return [action.payload.data, ...filtered]
    case REMOVE_DEPENDENT:
      const removed = state.filter(x=> x.id !== action.payload.data.id)
      return removed
    case REMOVE_EMPLOYEE:
      const withoutEmp = state.filter(x=> x.employeeId !== action.payload.data.id)
      return withoutEmp
    default: return state
  }
}

export const selectedDependentReducer = function (state = null, action){
  Object.freeze(state)
  switch(action.type){
    case SELECT_DEPENDENT:
      return action.payload
    case DESELECT_DEPENDENT:
      return null
    default: return state
  }
}