package com.microservice.account.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.microservice.account.model.Employee;
import com.microservice.account.model.EmployeeDto;
import com.microservice.account.model.HR;
import com.microservice.account.model.Manager;
import com.microservice.account.model.ManagerDto;
import com.microservice.account.repository.EmployeeRepository;
import com.microservice.account.repository.HRRepository;
import com.microservice.account.repository.ManagerRepository;

@Service
public class HRService {
	
	@Autowired
	private HRRepository hrRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private ManagerRepository managerRepository;
	
	public HR insertHR(HR hr) {
		String rawPass = hr.getUserInfo().getPassword();
		String encodedPass = passwordEncoder.encode(rawPass);
		hr.getUserInfo().setPassword(encodedPass);
		return hrRepository.save(hr);
	}
	public Map<String, Integer> getStat() {
		int countEmployees = employeeRepository.findAll().size();
		int countManagers = managerRepository.findAll().size();
		Map<String,Integer> map = new HashMap<>();
		map.put("count_Employees", countEmployees);
		map.put("count_Managers", countManagers);
			return map;
		}
	
	public List<ManagerDto> getAllManagerWithEmployee() {
		List<Employee> listEmployee = employeeRepository.findAll();
		List<Manager> listManager = managerRepository.findAll();
		
		
		List<ManagerDto> mDtoList = new ArrayList<>();
		
		listManager.stream().forEach(m->{
			ManagerDto mDto = new ManagerDto();
			mDto.setId(m.getId());
			mDto.setName(m.getName());
			mDto.setContact(m.getContact());
			mDto.setEmail(m.getEmail());
			mDto.setJobTitle(m.getJobTitle());
			
			List<Employee> filteredList = listEmployee.stream().filter(e->e.getManager().getId()==m.getId()).collect(Collectors.toList());
			
			List<EmployeeDto> eDtoList = new ArrayList<>();
			
			filteredList.stream().forEach(emp->{
				EmployeeDto empDto = new EmployeeDto();
				empDto.setId(emp.getId());
				empDto.setName(emp.getName());
				empDto.setSalary(emp.getSalary());
				empDto.setCity(emp.getCity());
				empDto.setJobTitle(emp.getJobTitle());
				eDtoList.add(empDto);
				
			});
			mDto.setEmployees(eDtoList);
			mDtoList.add(mDto);
		});
		
		return mDtoList;
		}

}
