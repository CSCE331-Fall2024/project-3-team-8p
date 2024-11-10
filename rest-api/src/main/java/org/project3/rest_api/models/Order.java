package org.project3.rest_api.models;

import java.util.UUID;

public class Order {
    public UUID orderId;

    public UUID cashierId;

    public Integer month;

    public Integer week;

    public Integer day;

    public Integer hour;

    public Double price;

    public Order() {}

    public Order(UUID orderId, UUID cashierId, Integer month, Integer week, Integer day, Integer hour, Double price) {
        this.orderId = orderId;
        this.cashierId = cashierId;
        this.month = month;
        this.week = week;
        this.day = day;
        this.hour = hour;
        this.price = price;
    }

    public Order(UUID cashierId, Integer month, Integer week, Integer day, Integer hour, Double price) {
            this(UUID.randomUUID(), cashierId ,month, week, day, hour, price);

    }

}

