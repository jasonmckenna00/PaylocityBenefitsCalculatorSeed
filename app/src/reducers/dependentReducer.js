import { SELECT_DEPENDENT, DESELECT_DEPENDENT, GET_All_DEPENDENTS, ADD_DEPENDENT, UPDATE_DEPENDENT, REMOVE_DEPENDENT } from "../actions/DependentActions";
import _ from "lodash";
import { REMOVE_EMPLOYEE } from "../actions/EmployeeActions";



export const dependentReducer = function (state = {}, action){
  Object.freeze(state)
  const newState = Object.assign({}, state)

  switch(action.type){
    case GET_All_DEPENDENTS:
      return _.mapKeys(action.payload.data, 'id')
    case ADD_DEPENDENT:
      newState[action.payload.data.id]= action.payload.data
      return newState
    case UPDATE_DEPENDENT:
      newState[action.payload.data.id] = action.payload.data
      return newState
    case REMOVE_DEPENDENT:
      delete newState[action.payload.data.id]
      return newState
    case REMOVE_EMPLOYEE:

      const withoutEmp = Object.values(newState).filter(x=> x.employeeId !== action.payload.data.id)
      return _.mapKeys(withoutEmp, 'id')
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