package com.microservice.account.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservice.account.exception.ResourceNotFoundException;
import com.microservice.account.model.Employee;
import com.microservice.account.model.Task;
import com.microservice.account.repository.EmployeeRepository;
import com.microservice.account.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private TaskRepository taskRepository;

    public void assignTask(int eid, Task task) {
        Employee employee = employeeRepository.findById(eid).get();
        task.setEmployee(employee);
        taskRepository.save(task);
    }

    public List<Task> getAllTask(int eid) {
        return taskRepository.findByEmployeeId(eid);
    }

    public void updateTaskForArchival(int tid) throws ResourceNotFoundException {
        // Fetch the task by ID
        Optional<Task> optionalTask = taskRepository.findById(tid);

        // Check if task exists before proceeding
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setArchived(true);
            int employeeId = task.getEmployee().getId();

            // Calculate reward points (consider logic based on task complexity)
            int rewardPoints = calculateRewardPoints(task); 

            task.setRewardPoints(rewardPoints);
            task.setRewardDate(LocalDate.now());
            taskRepository.save(task);

            // Update employee points (assuming Employee has a rewardPoints field)
            updateEmployeePoints(employeeId, rewardPoints);
        } else {
           throw new ResourceNotFoundException("Invalid task Id");
        }
    }

    private int calculateRewardPoints(Task task) {
      
        return 100;
    }

    // Update employee reward points 
    private void updateEmployeePoints(int employeeId, int rewardPoints) throws ResourceNotFoundException {
        Optional<Employee> optionalEmployee = employeeRepository.findById(employeeId);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            employee.setRewardPoints(employee.getRewardPoints() + rewardPoints);
            employeeRepository.save(employee);
        } else {
        	throw new ResourceNotFoundException("Invalid task Id");
        }
    }
}
