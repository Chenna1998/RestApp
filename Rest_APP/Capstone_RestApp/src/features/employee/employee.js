import Navbar from "../employee/components/navbar_employee";
import EmployeeShopping from "./components/employeeshopping";

function Employee(){
    return(
        <div>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <EmployeeShopping/>
                </div>
        </div>
    )
}
export default Employee;