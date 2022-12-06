import { useEffect, useState } from "react"
import { DependentListing } from "./DependentListing"
import { DependentForm } from "./DependentForm"
import { useSelector, useDispatch } from 'react-redux';
import { deselectDependent } from "../../actions/DependentActions";

const DependentModal = (props) => {
  const [formOpen,setFormOpen] = useState(false)
  const selectedEmployee = useSelector( state => state.employees.find(emp => emp.id === state.selectedEmployee))
  const dependents = useSelector(state => state.dependents.filter(x => x.employeeId === selectedEmployee?.id))

  const dispatch = useDispatch()
 
  function openForm(){
    if (formOpen) return
    setFormOpen(!formOpen)
  }

  function openNewForm(){
    dispatch(deselectDependent())
    openForm()
  }


  return (
    <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="dependent-modal-label" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="dependent-modal-label">Employee #{selectedEmployee?.id}: Dependents</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
        </div>
        <div className="modal-body">
        <button onClick={() => openNewForm()}>New Dependent</button>
          {formOpen && <DependentForm />}

          {selectedEmployee && <DependentListing setFormOpen={openForm}/>}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" >Close</button>
          {/* <button type="submit" className="btn btn-primary" aria-label="delete" data-bs-dismiss="modal" onClick={()=>props.removeEmployee(props.employee.id)}>Delete</button> */}
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default DependentModal