package com.microservice.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.microservice.account.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	
	@Query(nativeQuery = true , value = "select * from employee where name LIKE %?1% OR city LIKE %?1%")
	List<Employee> searchEmployeeOnName(String searchStr);

	@Query("select e from Employee e where e.name LIKE %?1% OR e.city LIKE %?1%")
	List<Employee> searchEmployeeOnNameJpql(String searchStr);

	
	@Query("select e.rewardPoints from Employee e JOIN e.userInfo u where u.username=?1")
	int getEmployeeRewardPointsJpql(String username);

	@Query("select e from Employee e JOIN e.userInfo u where u.username=?1")
	Employee getEmployeeByUserNameJpql(String username);


}
