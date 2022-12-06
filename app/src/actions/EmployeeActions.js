import { baseUrl } from '../Constants';
const apiUrl = `${baseUrl}/api/v1`;
export const GET_All_EMPLOYEES = 'GET_All_EMPLOYEES'
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE' 
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE'
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE' 
export const DESELECT_EMPLOYEE = 'DESELECT_EMPLOYEE'
export const selectEmployee = (employeeId) => dispatch => {
  return dispatch({type:SELECT_EMPLOYEE, payload: employeeId})
}
export const deselectEmployee = () => dispatch => {
  return dispatch({type: DESELECT_EMPLOYEE})
}


export const getEmployees = () => async dispatch => {
  try{
    const raw = await fetch(`${baseUrl}/api/v1/Employees`);
    const resp = await raw.json()
    return dispatch({type: GET_All_EMPLOYEES, payload: resp})
  }
  catch (error){
    const resp = {'success':false,'error':'400', 'message':error}
    console.log(resp)
  }
  
}


export const postEmployee = employee => async dispatch => {
    try{
      const raw = await fetch(`${apiUrl}/Employees`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee)
      });
      const resp = await raw.json()
      if (resp.success) dispatch({type: ADD_EMPLOYEE, payload: resp})
      return resp
    }
    catch (error){
      const resp = {'success':false,'error':'400', 'message':error}
      console.log(resp)
    }
    
}

export const putEmployee = (id, employee) => async dispatch => {
  try{
    const raw = await fetch(`${apiUrl}/Employees/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee)
    })
    
    const resp = await raw.json()
    if (resp.success) dispatch({type: UPDATE_EMPLOYEE, payload: resp})
    return resp

  } catch (error){
    const resp = {'success':false,'error':'400', 'message':error}
    console.log(resp)
  }
}

export const deleteEmployee = (id) => async dispatch => {
  try {
    const raw = await fetch(`${apiUrl}/Employees/${id}`,{
      method: "DELETE"
    })
    const resp = await raw.json()
    return dispatch({type:REMOVE_EMPLOYEE, payload:resp})
  } catch (error) {
    const resp = {'success':false,'error':'400', 'message':error}
    console.log(resp)
  }
} 