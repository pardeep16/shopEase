package com.thecodereveal.shopease.dto;

import com.thecodereveal.shopease.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.rmi.server.UID;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemDetail {

    private UUID id;
    private Product product;
    private UUID productVariantId;
    private Integer quantity;
    private Double itemPrice;
}
