package com.microservice.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservice.account.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer>{
	
	List<Task> findByEmployeeId(int eid);

}