import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { currencyFormat } from '../../Constants';

const PayCheckModal = (props) =>{
  const selectedEmployee = useSelector( state => state.employees[state.selectedEmployee])

  const dependents = useSelector(state => Object.values(state.dependents).filter(x => x.employeeId === selectedEmployee?.id))
  
  useEffect(()=>{

  },[selectedEmployee])

  function getPayPeriodCost(monthlyCost, numPaychecks=26){
    const cost = monthlyCost * 12 / numPaychecks
    return cost
  }

  const currentDate = new Date()
  const elderlyDependents = dependents?.filter( x => {
    const diffTime = currentDate - new Date(x.dateOfBirth) //milliseconds
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = diffDays / 365 //not accounting for leap year or 
    return diffYears > 50  
  })

  const salary = selectedEmployee?.salary || 0
  const monthlyDependentCost = 600 * dependents.length + 200 * elderlyDependents.length
  const monthlySalary = salary / 12
  const monthlyBaseCost = 1000


  const deductionBase = getPayPeriodCost(monthlyBaseCost)
  const deductionDependents = getPayPeriodCost(monthlyDependentCost)
  let deductionSalary = getPayPeriodCost(monthlySalary * 0.02)
  const payCheckSalary = getPayPeriodCost(monthlySalary)

  deductionSalary = salary > 80000 ? deductionSalary : 0
  const totalDeductions = deductionBase + deductionDependents + deductionSalary 
  const netPay = payCheckSalary - totalDeductions

  

  return (
    <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby="paycheck-modal-label" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
              <h1 className="modal-title fs-5" id="paycheck-modal-label">Employee #{selectedEmployee?.id}: Paycheck</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          <div className="modal-body">
            <table className="table caption-top">
              <caption>Benefits breakdown</caption>
              <thead className="table-dark">
                  <tr>
                      <th scope="col">Description</th>
                      <th scope="col">Current</th>
                      {/* <th scope="col">YTD (TODO)</th> */}
                  </tr>
                  <tr>
                    <td>Base Cost</td>
                    <td>{currencyFormat(deductionBase)}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Dependent Cost</td>
                    <td>{currencyFormat(deductionDependents)}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>High Salary Charge</td>
                    <td>{currencyFormat(deductionSalary)}</td>
                    <td></td>
                  </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
            <table className="table caption-top">
              <caption>Total Received</caption>
              <thead className="table-dark">
                  <tr>
                      <th scope="col">Total Wages</th>
                      <th scope="col">Total Deductions</th>
                      <th scope="col">Net Amount</th>
                  </tr>
                  <tr>
                    <td>{currencyFormat(payCheckSalary)}</td>
                    <td>{currencyFormat(totalDeductions)}</td>
                    <td>{currencyFormat(netPay)}</td>
                  </tr>
                 
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" >Close</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default PayCheckModal