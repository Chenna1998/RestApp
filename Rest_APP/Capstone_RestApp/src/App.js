import { Route, Routes } from "react-router";
import Login from "./auth/login";
import HR from "./features/hr/hr";
import EmployeeOnboarding from "./features/hr/components/employeeonboarding";
import ManagerOnboarding from "./features/hr/components/manageronboarding";
import Manager from "./features/manager/manager";
import { Provider } from "react-redux";
import store from "./store";
import Employee from "./features/employee/employee";
import Footer from "./components/footer";
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/employeeonboarding" element={<EmployeeOnboarding />} />
          <Route path="/manageronboarding" element={<ManagerOnboarding />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
