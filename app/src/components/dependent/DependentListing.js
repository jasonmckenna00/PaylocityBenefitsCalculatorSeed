import Dependent from "./Dependent"
import { useSelector } from 'react-redux';

export const DependentListing = (props) => {
  // const [dependents, setDependents] = useState([])
  // const selectedEmployee = useSelector( state => state.employees.find(emp => emp.id === state.selectedEmployee))
  const selectedEmployee = useSelector( state => state.employees[state.selectedEmployee])
  
  const dependents = useSelector(state => Object.values(state.dependents).filter(x => x.employeeId === selectedEmployee?.id))
  // const dependents = useSelector(state => state.dependents)

  

  // useEffect(()=>{
  //   setDependents(dependents)
  //   console.log(props.dependents?.length)
  // },[dependents])
  return (
    <div className="dependent-listing">
      <table className="table caption-top">
        <caption>Dependents</caption>
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">LastName</th>
            <th scope="col">FirstName</th>
            <th scope="col">DOB</th>
            <th scope="col">Relationship</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
          {dependents.map(({id, lastName, firstName, dateOfBirth, relationship})=>
            <Dependent 
              key={id}
              id={id}
              employeeId={selectedEmployee.id}
              firstName={firstName}
              lastName={lastName}
              dateOfBirth={dateOfBirth}
              relationship={relationship}
              selectDependent={props.selectDependent}
              setFormOpen={props.setFormOpen}
            />
          )}

        </tbody>
      </table>
    </div>
  )
}