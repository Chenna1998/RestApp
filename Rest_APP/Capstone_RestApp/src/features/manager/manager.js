import EmployeeList from "./components/employeelist";
import { getEmployees } from "../../store/action/employee";
import { useDispatch } from "react-redux";
import Navbar from "./components/navbar_manager";
import './manager.css';

function Manager() {
  const dispatch = useDispatch();
  dispatch(getEmployees());

  return (
    <div className="manager-page">
      <Navbar />
      <div className="content">
        <EmployeeList />
      </div>
    </div>
  );
}

export default Manager;
