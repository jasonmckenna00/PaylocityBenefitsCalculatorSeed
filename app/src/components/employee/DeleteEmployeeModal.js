import {deleteEmployee} from '../../actions/EmployeeActions';
import { useSelector, useDispatch } from 'react-redux';
const DeleteEmployeeModal = (props) =>{
  const dispatch = useDispatch()
  const selectedEmployee = useSelector( state => state.employees[state.selectedEmployee])




  return (
    <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="delete-employee-modal-label" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
              <h1 className="modal-title fs-5" id="delete-employee-modal-label">Delete Employee</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>props.deselectEmployee()}></button>
          </div>
          <div className="modal-body">
            <h3>Are you sure you want to delete?</h3>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" onClick={()=>props.deselectEmployee()}>Close</button>
            <button type="submit" className="btn btn-primary" aria-label="delete" data-bs-dismiss="modal" onClick={()=> dispatch(deleteEmployee(selectedEmployee.id))}>Delete</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default DeleteEmployeeModal