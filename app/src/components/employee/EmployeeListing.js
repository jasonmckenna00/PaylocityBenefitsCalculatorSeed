import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Employee from './Employee';
// import { baseUrl } from '../../Constants';
import AddEmployeeModal from './AddEmployeeModal';
import {deselectEmployee, getEmployees} from '../../actions/EmployeeActions';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import DependentModal from '../dependent/DependentModal';
import PayCheckModal from '../payCheck/payCheckModal'; 
import { getDependents } from '../../actions/DependentActions';


const EmployeeListing = () => {
    // const [employees, setEmployees] = useState([]);
    const employees = useSelector( state => Object.values(state.employees)) 
    const [error, setError] = useState(null);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getEmployees())
        dispatch(getDependents())
        // if (resp.success) {
        //   setEmployees(resp.data);
        //   setError(null);
        // }
        // else {
        //   setEmployees([]);
        //   setError(resp.error);
        // }
    }, [dispatch]);

    const addEmployeeModalId = "add-employee-modal";
    const deleteEmployeeModalId = "delete-employee-modal";
    const dependentsModalId = "dependents-modal";
    const payCheckModalId = "paycheck-modal";


    return (
    <div className="employee-listing">
        <table className="table caption-top">
            <caption>Employees</caption>
            <thead className="table-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">LastName</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Dependents</th>
                    <th scope="col">Paycheck</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {employees.map(({id, firstName, lastName, dateOfBirth, salary, dependents}) => (
                <Employee
                    key={id}
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    dateOfBirth={dateOfBirth}
                    salary={salary}
                    dependents={dependents}
                    editModalId={addEmployeeModalId}
                    deleteModalId={deleteEmployeeModalId}
                    dependentsModalId={dependentsModalId}
                    payCheckModalId={payCheckModalId}
                    
                    
                />
            ))}
            </tbody>
        </table>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${addEmployeeModalId}`} onClick={() => dispatch(deselectEmployee())}>Add Employee</button>
        <AddEmployeeModal
            id={addEmployeeModalId}
        />
        <DeleteEmployeeModal
          id={deleteEmployeeModalId}
        />
        <DependentModal 
          id={dependentsModalId}
          //selectedEmployee={selectedEmployee}
        />
        <PayCheckModal 
          id={payCheckModalId}

        />
      </div>
    );
};

export default EmployeeListing;