package com.microservice.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.microservice.account.model.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer>{

	@Query("select u from UserInfo u where u.username=?1")
	UserInfo findByUsername(String username);

}
