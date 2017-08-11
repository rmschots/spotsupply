package be.spotsupply.domain.commands.order;

import be.spotsupply.domain.model.beach.Beach;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateShoppingCartCommand {
    private Beach beach;
}
