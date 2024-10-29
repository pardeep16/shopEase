package com.thecodereveal.shopease.services;

import com.thecodereveal.shopease.auth.entities.User;
import com.thecodereveal.shopease.dto.AddressRequest;
import com.thecodereveal.shopease.entities.Address;
import com.thecodereveal.shopease.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Service
public class AddressService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AddressRepository addressRepository;

    public Address createAddress(AddressRequest addressRequest, Principal principal){
        User user= (User) userDetailsService.loadUserByUsername(principal.getName());
        Address address = Address.builder()
                .name(addressRequest.getName())
                .street(addressRequest.getStreet())
                .city(addressRequest.getCity())
                .state(addressRequest.getState())
                .zipCode(addressRequest.getZipCode())
                .phoneNumber(addressRequest.getPhoneNumber())
                .user(user)
                .build();
        return addressRepository.save(address);
    }

    public void deleteAddress(UUID id) {
        addressRepository.deleteById(id);
    }
}
