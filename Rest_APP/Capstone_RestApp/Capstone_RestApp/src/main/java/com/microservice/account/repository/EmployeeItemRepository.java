package com.microservice.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservice.account.model.EmployeeItem;

public interface EmployeeItemRepository extends JpaRepository<EmployeeItem, Integer> {

}
