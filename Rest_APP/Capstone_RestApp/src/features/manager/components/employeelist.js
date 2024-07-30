import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from 'primereact/calendar';
import axios from "axios";
import { getEmployees } from '../../../store/action/employee';
import '../components/employeelist.css'; 

function EmployeeList() {
    const { list } = useSelector((state) => state.employee);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [filters, ] = useState({
        name: { value: null, matchMode: 'custom' },
        city: { value: null, matchMode: 'equals' },
        salary: { value: null, matchMode: 'equals' }
    });
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visibleTasks, setVisibleTasks] = useState(false);
    const [employee, setEmployee] = useState({});
    const [dates, setDates] = useState(null);
    const [taskDetails, setTaskDetails] = useState('');
    const [msg, setMsg] = useState(null);
    const [tasks, setTasks] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        dispatch(getEmployees());
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        setData(list);
    }, [list]);

    const assignTask = () => {
        let startDate = new Date(dates[0]).toISOString().split("T")[0];
        let endDate = new Date(dates[1]).toISOString().split("T")[0];
        let empId = employee.id;
        let taskData = {
            'taskDetails': taskDetails,
            'startDate': startDate,
            'endDate': endDate
        };

        axios.post(`http://localhost:8081/api/task/employee/${empId}`, taskData, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg(`Task Assigned to ${employee.name} successfully.`);
        })
        .catch(err => {
            setMsg("Operation Failed, please contact Admin.");
        });
    };

    const globalSearch = (value) => {
        if (value === "") {
            setData(list); // Reset data to original list if search is empty
        } else {
            let temp = list.filter((row) =>
                row.name.toLowerCase().includes(value.toLowerCase()) ||
                row.city.toLowerCase().includes(value.toLowerCase()) ||
                row.jobTitle.toLowerCase().includes(value.toLowerCase())
            );
            setData(temp); // Update data with filtered results
        }
    };

    const showTask = (id) => {
        axios.get(`http://localhost:8081/api/task/${id}`, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setTasks(resp.data);
        })
        .catch(err => {
            console.error("Failed to fetch tasks", err);
        });
    };

    const renderHeader = () => {
        return (
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search"></i>
                </span>
                <InputText
                    onChange={(e) => globalSearch(e.target.value)}
                    placeholder="Search by city/name/jobtitle"
                />
            </div>
        );
    };

    const header = renderHeader();

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <button className="p-button p-button-info" onClick={() => {
                    setEmployee(rowData);
                    setVisibleTasks(true);
                    showTask(rowData.id);
                    setMsg(null);
                }}>
                    <i className="pi pi-eye"></i> Show Tasks
                </button>
                &nbsp;&nbsp;
                <button className="p-button p-button-warning" onClick={() => {
                    setEmployee(rowData);
                    setTaskDetails(''); // Reset task details
                    setDates(null); // Reset dates
                    setVisible(true);
                    setMsg(null);
                }}>
                    <i className="pi pi-plus"></i> Assign Task
                </button>
            </div>
        );
    };

    const cityRowFilter = (value) => {
        console.log(value);
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">
                Assign task to {employee?.name}
            </span>
            {msg === null ? (
                ""
            ) : (
                <div className="task-message">
                    {msg}
                </div>
            )}
        </div>
    );

    const footerContent = (
        <div>
            <button className="p-button p-button-warning" onClick={() => assignTask()}>Assign</button>
            &nbsp;&nbsp;&nbsp;
            <button className="p-button p-button-danger" onClick={() => { setVisible(false); setVisibleTasks(false); }}>Cancel</button>
        </div>
    );

    const footerContentTask = (
        <div>
            &nbsp;&nbsp;&nbsp;
            <button className="p-button p-button-danger" onClick={() => { setVisible(false); setVisibleTasks(false); }}>Cancel</button>
        </div>
    );

    const archiveTask = (tid) => {
        axios.get(`http://localhost:8081/api/task/archive/${tid}`, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setTasks(tasks.filter(t => t.id !== tid));
            setMsg('Task Archived');
            // Update employee points after archiving the task
            dispatch(getEmployees());
        })
        .catch(err => {
            setMsg('Operation Failed, Contact admin');
        });
    };

    const handleDateChange = (e) => {
        setDates(e.value);
        if (e.value && e.value.length === 2) {
            setTimeout(() => {
                const calendarButton = document.querySelector('.p-calendar-button');
                if (calendarButton) {
                    calendarButton.click(); // Simulate a click to close the calendar
                }
            }, 0);
        }
    };

    return (
        <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <div className="table-container">
                <DataTable
                    value={data}
                    paginator
                    rows={4}
                    dataKey="id"
                    filters={filters}
                    filterDisplay="row"
                    loading={loading}
                    header={header}
                    emptyMessage="No employees found."
                    className="p-datatable-striped custom-table"
                >
                    <Column field="id" header="System ID" style={{ minWidth: "10rem" }} />
                    <Column
                        field="name"
                        header="Name"
                        filterPlaceholder="Search by name"
                        style={{ minWidth: "12rem" }}
                    />
                    <Column
                        field="city"
                        header="City"
                        style={{ minWidth: "12rem" }}
                        filterPlaceholder="Search by City"
                        filterElement={cityRowFilter}
                    />
                    <Column field="salary" header="Salary" style={{ minWidth: "10rem" }} />
                    <Column
                        field="jobTitle"
                        header="Job Title"
                        filterField="jobTitle"
                        style={{ minWidth: "14rem" }}
                        filterPlaceholder="Search by job Title"
                    />
                    <Column field="rewardPoints" header="Reward Points" style={{ minWidth: "10rem" }} />
                    <Column header="Action" body={actionBodyTemplate} style={{ minWidth: "16rem" }}></Column>
                </DataTable>
            </div>

            <Dialog
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                className="assign-task-dialog"
                style={{ width: "30vw" }}
                onHide={() => setVisible(false)}
            >
                <div className="field">
                    <label htmlFor="taskDetails">Task Details</label>
                    <InputTextarea
                        id="taskDetails"
                        rows={3}
                        value={taskDetails}
                        onChange={(e) => setTaskDetails(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="dates">Select Dates</label>
                    <Calendar
                        value={dates}
                        onChange={handleDateChange}
                        selectionMode="range"
                        readOnlyInput
                        ref={calendarRef}
                    />
                </div>
            </Dialog>

            <Dialog
                visible={visibleTasks}
                modal
                header="Task Details"
                footer={footerContentTask}
                style={{ width: "50vw" }}
                onHide={() => setVisibleTasks(false)}
            >
                <div className="flex flex-column gap-3">
                    {tasks.map((t) => (
                        <div className="card flex flex-row justify-content-between align-items-center gap-2 p-2" key={t.id}>
                            <div>{t.taskDetails}</div>
                            <button className="p-button p-button-info" onClick={() => archiveTask(t.id)}>Archive</button>
                        </div>
                    ))}
                </div>
            </Dialog>
        </div>
    );
}

export default EmployeeList;
