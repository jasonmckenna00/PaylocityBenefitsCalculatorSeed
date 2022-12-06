import { currencyFormat, dateFormat } from "../../Constants";
import {useDispatch} from 'react-redux'
import { selectEmployee } from "../../actions/EmployeeActions";
import { deselectDependent } from "../../actions/DependentActions";
const Employee = (props) => {
    const firstName = props.firstName || '';
    const lastName = props.lastName || '';
    const salary = props.salary || 0;
    const dispatch = useDispatch()
    function viewDependents(){
      dispatch(selectEmployee(props.id))
      dispatch(deselectDependent())
    }
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{lastName}</td>
            <td>{firstName}</td>
            <td>{dateFormat(props.dateOfBirth)}</td>
            <td>{currencyFormat(salary)}</td>
            <td className="dependents-td">
              <div>{props.dependents?.length || 0}</div> 
              <a href="#" 
                data-bs-toggle="modal" 
                className="view-dependents" 
                data-bs-target={`#${props.dependentsModalId}`}
                onClick={()=> viewDependents()}
              >
                View
              </a>
            </td>
            <td>
                <a href="#" data-bs-toggle="modal" data-bs-target={`#${props.payCheckModalId}`} onClick={()=> dispatch(selectEmployee(props.id))}>View Paychecks</a>
            </td>
            <td>
                <a href="#" data-bs-toggle="modal" data-bs-target={`#${props.editModalId}`} onClick={()=> dispatch(selectEmployee(props.id))}>Edit</a>
                <a href="#" data-bs-toggle="modal" data-bs-target={`#${props.deleteModalId}`} onClick={()=> dispatch(selectEmployee(props.id))}>Delete</a>
            </td>
            
        </tr>
    );
};

export default Employee;