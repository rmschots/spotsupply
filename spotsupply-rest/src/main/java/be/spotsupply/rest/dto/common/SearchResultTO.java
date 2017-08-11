package be.spotsupply.rest.dto.common;

import be.spotsupply.rest.AbstractTO;
import lombok.Getter;

@Getter
public class SearchResultTO implements AbstractTO {
    protected int pages;
    protected int page;
    protected String filter;
    protected long totalResults;
    protected int pageSize;
}
