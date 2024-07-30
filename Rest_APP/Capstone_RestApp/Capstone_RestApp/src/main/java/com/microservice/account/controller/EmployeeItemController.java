package com.microservice.account.controller;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.account.dto.ResponseDto;
import com.microservice.account.exception.ResourceNotFoundException;
import com.microservice.account.model.Employee;
import com.microservice.account.model.EmployeeItem;
import com.microservice.account.model.Item;
import com.microservice.account.service.EmployeeItemService;
import com.microservice.account.service.EmployeeService;
import com.microservice.account.service.ItemService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class EmployeeItemController {
    
    @Autowired
    private ItemService itemService;
    
    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    private EmployeeItemService employeeItemService;

    @PostMapping("/api/employee/item/post")
    public ResponseEntity<?> postEmployeeItem(@RequestBody Map<Integer, Integer> itemQuantities, Principal principal) {
        String username = principal.getName();
        Employee employee = employeeService.getEmployeeByUserName(username);
        List<EmployeeItem> empItems = new ArrayList<>();

        for (Map.Entry<Integer, Integer> entry : itemQuantities.entrySet()) {
            int itemId = entry.getKey();
            int quantity = entry.getValue();

            try {
                Item item = itemService.getItem(itemId);
                if (item.getQuantity() < quantity) {
                    return ResponseEntity.badRequest().body(new ResponseDto("Insufficient stock for item: " + itemId, "400"));
                }

                item.setQuantity(item.getQuantity() - quantity);
                itemService.saveItem(item); // Save updated item quantity

                for (int i = 0; i < quantity; i++) {
                    EmployeeItem empItem = new EmployeeItem();
                    empItem.setEmployee(employee);
                    empItem.setItem(item);
                    empItem.setDateofPurchase(LocalDate.now());
                    empItems.add(employeeItemService.addEmployeeItem(empItem));
                }
            } catch (ResourceNotFoundException e) {
                return ResponseEntity.badRequest().body(new ResponseDto(e.getMessage(), "400"));
            }
        }

        return ResponseEntity.ok().body(empItems);
    }
}
