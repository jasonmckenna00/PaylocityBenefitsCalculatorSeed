import { dateFormat, relationshipMap } from "../../Constants";
import { useSelector, useDispatch } from 'react-redux';
import { selectDependent, deleteDependent } from "../../actions/DependentActions";
import { selectEmployee } from "../../actions/EmployeeActions";



const Dependent = (props) => {
  const dispatch = useDispatch()
  const firstName = props.firstName || '';
  const lastName = props.lastName || '';

  function openEdit(){
    dispatch(selectEmployee(props.employeeId))
    // const dep = {id, props.firstName, lastName, dateOfBirth,relationship}
    dispatch(selectDependent(props.id))
    props.setFormOpen()
  }
  function openDelete(){
    dispatch(deleteDependent(props.id))

  }
  return(
    <tr>
      <th scope="row">{props.id}</th>
      <td>{lastName}</td>
      <td>{firstName}</td>
      <td>{dateFormat(props.dateOfBirth)}</td>
      <td>{relationshipMap(props.relationship)}</td>
      <td>
          <a href="#" onClick={()=> openEdit()}>Edit</a>
          <a href="#" onClick={()=> openDelete()}>Delete</a>
      </td>
  </tr>
  )
}

export default Dependent