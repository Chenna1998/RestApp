package com.microservice.account.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservice.account.exception.ResourceNotFoundException;
import com.microservice.account.model.Item;
import com.microservice.account.repository.ItemRepository;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;
    
    public Item addItem(Item item) {
        return itemRepository.save(item);    
    }

    public List<Item> getAllItem() {
        return itemRepository.findAll();    
    }

    public Item getItem(int id) throws ResourceNotFoundException {
        Optional<Item> optional = itemRepository.findById(id);
        if(optional.isEmpty()) {
            throw new ResourceNotFoundException("Invalid Item Id Given");
        }
        return optional.get();
    }

    public Item saveItem(Item item) {
        return itemRepository.save(item); // Save the updated item
    }
}
