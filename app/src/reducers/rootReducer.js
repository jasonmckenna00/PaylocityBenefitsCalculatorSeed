import { combineReducers } from 'redux'
import { employeeReducer, selectedEmployeeReducer} from './employeeReducer'
import { dependentReducer, selectedDependentReducer } from './dependentReducer'

const rootReducer = combineReducers({
  employees: employeeReducer,
  selectedEmployee: selectedEmployeeReducer, 
  dependents: dependentReducer,
  selectedDependent: selectedDependentReducer
})

export default rootReducer