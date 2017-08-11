package be.spotsupply.rest.dto.order;

import be.spotsupply.rest.AbstractTO;
import be.spotsupply.rest.dto.order.CartItemTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartTO implements AbstractTO {
    private Long id;
    private long beachId;
    private List<CartItemTO> items;
    private String status;
    private double price;
    private LocalDateTime orderDateTime;
    private String requestedTime;
    private LocalDateTime deliveredDateTime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    public LocalDateTime getOrderDateTime() {
        return orderDateTime;
    }
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    public LocalDateTime getDeliveredDateTime() {
        return deliveredDateTime;
    }
}
