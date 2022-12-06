import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { postDependent, putDependent } from "../../actions/DependentActions";
import { dateFormat, relationshipMap } from "../../Constants";
export const DependentForm = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [relationship, setRelationship] = useState(0)
  const [errors, setErrors] = useState(null)

  const selectedDependent = useSelector(state => state.dependents[state.selectedDependent])
  const selectedEmployee = useSelector( state => state.employees[state.selectedEmployee])
  const dependents = useSelector(state => Object.values(state.dependents).filter(x => x.employeeId === selectedEmployee?.id))

  const dispatch = useDispatch()

  useEffect(()=> {
    setFirstName(selectedDependent?.firstName || '')
    setLastName(selectedDependent?.lastName || '')
    setRelationship(selectedDependent?.relationship || 0)
    setDateOfBirth(selectedDependent?.dateOfBirth || '')
  },[selectedDependent])

  function clearForm(){
    setFirstName('')
    setLastName('')
    setRelationship(0)
    setDateOfBirth('')
  }


  function handleDependent(e){
    e.preventDefault()
    const formatedRelationship = parseInt(relationship)
    const inputErrs = validateInputs()
    if (inputErrs.length){
      setErrors(inputErrs)
      return
    }
    setErrors(null)

    if (selectedDependent){
      dispatch(putDependent(selectedDependent.id,{firstName, lastName, dateOfBirth, relationship:formatedRelationship}))
      .then(resp => {
        if (resp.success) setErrors(null)
        if (!resp.success) setErrors(resp.message) 
      })
    } else {
      dispatch(postDependent({employeeId: selectedEmployee.id, firstName, lastName, dateOfBirth, relationship:formatedRelationship}))
      .then(resp => {
        if (resp.success) setErrors(null)
        if (!resp.success) setErrors(resp.message) 
        clearForm()
      })
    }
  }

  function validateInputs(){
    let message = ''
    const currentDate = new Date()
    if (currentDate - dateOfBirth < 0 || dateOfBirth.length === 0){
      message += 'Must choose Date of Birth before today\n'
    }
    const formatedRelationship = parseInt(relationship)

    if (relationshipMap(formatedRelationship) === 'Spouse' || relationshipMap(formatedRelationship) === 'Domestic Partner'){
      const partnerExists = dependents.filter(x=> x.relationship === 1 || x.relationship === 2 )
      
      if (partnerExists.length){
        message += 'Cannot add multiple partners'
      } 
    }

    return message
  }

  return(
    <div id="dependent-form">
      {errors && <h6>{errors}</h6>}

      {selectedDependent ? "Edit" : "Add"} Dependent 
      <form id='add-dependent-form' onSubmit={handleDependent}>
      <label>
        First Name:
        <input type="text" value={firstName} id="first-name" onChange={e=> setFirstName(e.target.value)}></input>
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} id="last-name" onChange={e=> setLastName(e.target.value)}></input>
      </label>
      <label>
        Date of Birth:
        <input type='date' value={dateFormat(dateOfBirth)} id="dob" onChange={e=> setDateOfBirth(e.target.value)}></input>
      </label>
      <label>
        Relationship
        <select id="relationship-select" value={relationship} onChange={e=> setRelationship(e.target.value)}>
          <option value='0' >None</option>
          <option value='1'>Spouse</option>
          <option value='2'>Domestic Partner</option>
          <option value='3'>Child</option>

        </select>
      </label>
      <button type="submit" className="btn btn-secondary" form="add-dependent-form" aria-label="Save-changes" >Save changes</button>
      </form>
    </div>
  )
}