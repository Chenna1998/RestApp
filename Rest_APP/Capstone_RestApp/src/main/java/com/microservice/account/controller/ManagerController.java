package com.microservice.account.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.account.enums.JobTitle;
import com.microservice.account.enums.RoleType;
import com.microservice.account.model.Employee;
import com.microservice.account.model.Manager;
import com.microservice.account.model.UserInfo;
import com.microservice.account.service.ManagerService;
import com.microservice.account.service.UserInfoService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class ManagerController {
	
	@Autowired
	private ManagerService managerService;
	@Autowired
	private UserInfoService userInfoService;
	
	@PostMapping("/api/manager/add")
	public Manager addManager(@RequestBody Manager manager) {
		manager.setJobTitle(JobTitle.PROJECT_MANAGER);
		UserInfo userInfo = manager.getUserInfo();
		userInfo.setRole(RoleType.MANAGER);
		userInfo = userInfoService.insertUserInfo(userInfo);
		manager.setUserInfo(userInfo);
		return managerService.insertManager(manager);
	}
	
	@GetMapping("/api/manager/all")
	public List<Manager> getAllManager() {
		return managerService.getAllManager();	
	}
	
	@GetMapping("/api/manager/employee")
	public List<?> getEmployeeByManager(Principal principal) {
		String username = principal.getName();
		List<Employee> list = managerService.getEmployeeByManager(username);
		return list;
		
	}
}
