import { SELECT_DEPENDENT, DESELECT_DEPENDENT, REMOVE_DEPENDENT, ADD_DEPENDENT } from "../actions/DependentActions"
import { GET_All_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE, REMOVE_EMPLOYEE, SELECT_EMPLOYEE, DESELECT_EMPLOYEE } from "../actions/EmployeeActions"
import _ from "lodash";


export const employeeReducer = function (state = {}, action){
  Object.freeze(state)
  const newState = Object.assign({}, state)
  switch(action.type){
    case GET_All_EMPLOYEES:
      return _.mapKeys(action.payload.data, 'id')
    case ADD_EMPLOYEE:
      newState[action.payload.data.id]= action.payload.data
      return newState
    case UPDATE_EMPLOYEE:
      newState[action.payload.data.id] = action.payload.data
      return newState
    case REMOVE_EMPLOYEE:
      delete newState[action.payload.data.id]
      return newState
    case ADD_DEPENDENT:
      newState[action.payload.data.employeeId].dependents.push(action.payload.data)
      return newState
    case REMOVE_DEPENDENT:
      const empId = action.payload.data.employeeId
      const newDeps = newState[empId].dependents.filter(x=>x.id !== action.payload.data.id)
      newState[empId].dependents = newDeps
      return newState

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