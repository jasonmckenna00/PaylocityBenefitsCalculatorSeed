import { baseUrl } from '../Constants';
const apiUrl = `${baseUrl}/api/v1`;


export const GET_All_DEPENDENTS = 'GET_All_DEPENDENTS'
export const ADD_DEPENDENT = 'ADD_DEPENDENT' 
export const UPDATE_DEPENDENT = 'UPDATE_DEPENDENT'
export const REMOVE_DEPENDENT = 'REMOVE_DEPENDENT'
export const SELECT_DEPENDENT = 'SELECT_DEPENDENT' 
export const DESELECT_DEPENDENT = 'DESELECT_DEPENDENT'

export const selectDependent = (dependentId) => dispatch => {
  return dispatch({type:SELECT_DEPENDENT, payload: dependentId})
}
export const deselectDependent = () => dispatch => {
  return dispatch({type: DESELECT_DEPENDENT})
}

export const getDependents = () => async dispatch => {
  try{
    const raw = await fetch(`${baseUrl}/api/v1/Dependents`);
    const resp = await raw.json()
    return dispatch({type: GET_All_DEPENDENTS, payload: resp})
    // const response = await raw.json();
    // return response
  }
  catch (error){
    const resp = {'success':false,'error':'400', 'message':error}
    console.log(resp)
  }
  
}

export const postDependent = (dependent) => async dispatch => {
  try{
    const raw = await fetch(`${apiUrl}/Dependents`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dependent)
    });
    const resp = await raw.json()
    
    if (resp.success) dispatch({type: ADD_DEPENDENT, payload: resp})
    return resp
    // Here you can add dispatch to reducer if using redux
  }
  catch (error){
    const resp = {'success':false,'error':'400', 'message':error}
    return resp
  }
}

export const putDependent = (id, dependent) => async dispatch => {
  try{
    const raw = await fetch(`${apiUrl}/Dependents/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dependent)
    })
    
    const resp = await raw.json()
    if (resp.success) dispatch({type: UPDATE_DEPENDENT, payload: resp})
    return resp

  } catch (error){
    const resp = {'success':false,'error':'400', 'message':error}
    console.log(resp)
  }
}

export const deleteDependent = (id) => async dispatch => {
  try {
    const raw = await fetch(`${apiUrl}/Dependents/${id}`,{
      method: "DELETE"
    })
    const resp = await raw.json()
    return dispatch({type:REMOVE_DEPENDENT, payload:resp})
  } catch (error) {
    const resp = {'success':false,'error':'400', 'message':error}
    console.log(resp)
  }
} 
