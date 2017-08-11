package be.spotsupply.rest.mapper.impl;

import org.springframework.stereotype.Component;

@Component
public class OrderSearchSortByMapper {

    public String mapToDomain(String sortBy) {
        switch (sortBy) {
            case "beachId":
                return "beach.name";
            case "phoneNumber":
                return "user.phoneNumber";
            case "status":
                return "status";
            case "price":
                return "price";
            case "orderDateTime":
                return "orderDateTime";
            case "requestedTime":
                return "requestedTime";
            case "deliveredDateTime":
                return "deliveredDateTime";
            default:
                return "id";
        }
    }
}
