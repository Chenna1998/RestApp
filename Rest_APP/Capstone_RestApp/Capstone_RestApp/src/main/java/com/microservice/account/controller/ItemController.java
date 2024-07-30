package com.microservice.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.account.model.Item;
import com.microservice.account.service.ItemService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class ItemController {
	
	@Autowired
	private ItemService itemService;
	
	@PostMapping("/api/items/add")
	public Item addItem(@RequestBody Item item) {
	return itemService.addItem(item);			
	}
	
	@GetMapping("/api/item/getAll")
	public List<Item> getAllItem() {
		return itemService.getAllItem();
	}
	
	

}
