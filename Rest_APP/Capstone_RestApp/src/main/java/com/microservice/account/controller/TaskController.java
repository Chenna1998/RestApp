package com.microservice.account.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.account.exception.ResourceNotFoundException;
import com.microservice.account.model.Task;
import com.microservice.account.service.TaskService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class TaskController {

	@Autowired
	private TaskService taskService;
	@PostMapping("/api/task/employee/{eid}")
	public void assignTask(@PathVariable("eid") int eid, @RequestBody Task task) {
		taskService.assignTask(eid,task);
	}
	@GetMapping("/api/task/{eid}")
	public List<Task> getAllTask(@PathVariable("eid") int eid){
		return taskService.getAllTask(eid)
				.stream()
				.filter(t->t.isArchived() == false)
				.collect(Collectors.toList());
	}
	
	@GetMapping("/api/task/archive/{tid}")
	public void updateTaskForArchival(@PathVariable("tid") int tid) {
		try {
			taskService.updateTaskForArchival(tid);
		} catch (ResourceNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}