package com.thecodereveal.shopease.services;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.thecodereveal.shopease.auth.entities.User;
import com.thecodereveal.shopease.entities.Order;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
public class PaymentIntentService {

    public Map<String, String> createPaymentIntent(Order order) throws StripeException {
        User user = order.getUser();
        Map<String, String> metaData = new HashMap<>();
        metaData.put("orderId",order.getId().toString());
        PaymentIntentCreateParams paymentIntentCreateParams= PaymentIntentCreateParams.builder()
                .setAmount((long) (order.getTotalAmount() * 100 * 80)) // USD to INR
                .setCurrency("inr")//INR currency
                .putAllMetadata(metaData)
                .setDescription("Test Payment Project -1")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                )
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(paymentIntentCreateParams);
        Map<String, String> map = new HashMap<>();
        map.put("client_secret", paymentIntent.getClientSecret());
        return map;
    }
}
