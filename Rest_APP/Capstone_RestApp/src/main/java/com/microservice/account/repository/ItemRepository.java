package com.microservice.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservice.account.model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer>{

}
