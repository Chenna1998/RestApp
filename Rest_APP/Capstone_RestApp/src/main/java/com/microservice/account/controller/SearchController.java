package com.microservice.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.account.model.Employee;
import com.microservice.account.model.EmployeeManagerDto;
import com.microservice.account.model.Manager;
import com.microservice.account.service.EmployeeService;
import com.microservice.account.service.ManagerService;
import com.microservice.account.service.SearchService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class SearchController {

	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private ManagerService managerService; 
	@Autowired
	private SearchService searchService;
	
	@GetMapping("/api/search/employee/manager/{searchStr}")
	public List<?> searchEmployeeAndManagerOnName(@PathVariable("searchStr") String searchStr) {
		List<Employee> listEmp = employeeService.searchEmployeeOnName(searchStr);
		List<Manager> listMng = managerService.searchManagerOnName(searchStr);
		List<EmployeeManagerDto> list= searchService.convertToDto(listEmp,listMng);
		return list;
	}


}