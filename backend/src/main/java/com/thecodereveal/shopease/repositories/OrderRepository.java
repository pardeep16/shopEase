package com.thecodereveal.shopease.repositories;

import com.thecodereveal.shopease.auth.entities.User;
import com.thecodereveal.shopease.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    List<Order> findByUser(User user);
}
