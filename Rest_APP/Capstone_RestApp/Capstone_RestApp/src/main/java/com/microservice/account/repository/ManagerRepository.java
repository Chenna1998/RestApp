package com.microservice.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.microservice.account.model.Employee;
import com.microservice.account.model.Manager;

public interface ManagerRepository  extends JpaRepository<Manager, Integer>{
	@Query("select m from Manager m where m.name LIKE %?1%")
	List<Manager> searchManagerOnName(String searchStr);

	/*
	@Query(nativeQuery = true,
			value="select e.* from employee e "
					+ " JOIN manager m ON e.manager_id = m.id "
					+ " JOIN user_info u ON m.user_info_id = u.id "
					+ " where u.username=?1")
	List<Employee> getEmployeeByManager(String username);
	*/

	@Query("select e from Employee e "
			+ " JOIN e.manager m "
			+ " JOIN m.userInfo u "
			+ " where u.username=?1")
	List<Employee> getEmployeeByManagerJpql(String username);

}
