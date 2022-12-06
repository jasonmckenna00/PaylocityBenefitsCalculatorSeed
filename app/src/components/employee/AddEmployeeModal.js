//if edit -> Passs in employee props, Change h1 to edit employee
// create either put or post request

import { useEffect, useState } from "react";
import { dateFormat } from "../../Constants";
import { useSelector, useDispatch } from 'react-redux';
import {postEmployee, putEmployee} from '../../actions/EmployeeActions';

const AddEmployeeModal = () => {
  const selectedEmployee = useSelector( state => state.employees[state.selectedEmployee])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [salary, setSalary] = useState(0)
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch()

    useEffect(() =>{
      setFirstName(selectedEmployee?.firstName || '')
      setLastName(selectedEmployee?.lastName || '')
      setSalary(selectedEmployee?.salary || 0)
      setDateOfBirth(selectedEmployee?.dateOfBirth || '')

    },[selectedEmployee])

    function handleEmployee(e){
      e.preventDefault()
      const inputErrs = validateInputs()
      if (inputErrs.length){
        setErrors(inputErrs)
        return
      }
      setErrors(null)

      if (selectedEmployee){
        dispatch(putEmployee(selectedEmployee.id, {firstName, lastName, salary}))
        .then(resp => {
          if (resp.success) setErrors(null)
          if (!resp.success) setErrors(resp.message)
        })
      }else {
        dispatch(postEmployee({firstName, lastName,salary,dateOfBirth}))
        .then(resp => {
          if (resp.success) setErrors(null)
          if (!resp.success) setErrors(resp.message)
        })
        clearModal()
      }
    }

    function validateInputs(){
      let message = ''
      if (!selectedEmployee){
        const currentDate = new Date()
        if (currentDate - dateOfBirth < 0 || dateOfBirth.length === 0){
          message += 'Must choose Date of Birth before today\n'
        }
      }
      if (salary < 0 ){
        message += 'Salary must be non zero'
      }
      return message
      
    }

    function clearModal(){
      setFirstName('')
      setLastName('')
      setSalary(0)
      setDateOfBirth('')
    }
    
    return (
        <div className="modal fade" id="add-employee-modal" tabIndex="-1" aria-labelledby="add-employee-modal-label" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="add-employee-modal-label">{selectedEmployee ? 'Edit' : 'Add'} Employee </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearModal}></button>
                    </div>
                    <div className="modal-body">
                      {errors && <h6>{errors}</h6>}
                        <form onSubmit={handleEmployee} id="add-employee-form">
                          <label>
                            First Name:
                            <input type="text" value={firstName} id="first-name" onChange={e=> setFirstName(e.target.value)}></input>
                          </label>
                          <label>
                            Last Name:
                            <input type="text" value={lastName} id="last-name" onChange={e=> setLastName(e.target.value)}></input>
                          </label>
                          <label>
                            Salary:
                            <input type="number" value={salary} id="salary" onChange={e=> setSalary(e.target.value)}></input>
                          </label>
                          {!selectedEmployee && <label>
                            Date of Birth:
                            <input type='date' value={dateFormat(dateOfBirth)} id="dob" onChange={e=> setDateOfBirth(e.target.value)}></input>
                          </label>}
                        </form>
                        <br></br>
                        

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" onClick={clearModal}>Close</button>
                        <button type="submit" className="btn btn-primary" form="add-employee-form" aria-label="Save-changes">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeModal;