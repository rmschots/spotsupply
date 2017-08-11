package be.spotsupply.rest.dto.common;

import be.spotsupply.rest.AbstractTO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TranslationsTO implements AbstractTO {
    private String en;
    private String nl;
    private String fr;
}
