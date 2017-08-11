package be.spotsupply.domain.commands.order;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PlaceOrderCommand {
    private String requestedTime;

}
