package com.microservice.account.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservice.account.model.EmployeeItem;
import com.microservice.account.repository.EmployeeItemRepository;

@Service
public class EmployeeItemService {
    
    @Autowired
    private EmployeeItemRepository employeeItemRepository;

    public EmployeeItem addEmployeeItem(EmployeeItem empItem) {
        return employeeItemRepository.save(empItem);
    }
}
