package be.spotsupply.rest.dto.order;

import be.spotsupply.rest.dto.common.SearchResultTO;
import lombok.Getter;

import java.util.List;

@Getter
public class OrdersSearchResultTO extends SearchResultTO {
    private List<OrderInfoTO> orders;

    OrdersSearchResultTO(BuilderImpl builder) {
        this.pages = builder.pages;
        this.page = builder.page;
        this.filter = builder.filter;
        this.totalResults = builder.totalResults;
        this.pageSize = builder.pageSize;
        this.orders = builder.orders;
    }

    public static BuilderImpl builderImpl() {
        return new BuilderImpl();
    }

    public static class BuilderImpl {
        private int pages;
        private int page;
        private String filter;
        private long totalResults;
        private int pageSize;
        private List<OrderInfoTO> orders;

        public BuilderImpl pages(int pages) {
            this.pages = pages;
            return this;
        }

        public BuilderImpl page(int page) {
            this.page = page;
            return this;
        }

        public BuilderImpl filter(String filter) {
            this.filter = filter;
            return this;
        }

        public BuilderImpl totalResults(long totalResults) {
            this.totalResults = totalResults;
            return this;
        }

        public BuilderImpl pageSize(int pageSize) {
            this.pageSize = pageSize;
            return this;
        }

        public BuilderImpl orders(List<OrderInfoTO> orders) {
            this.orders = orders;
            return this;
        }

        public OrdersSearchResultTO build() {
            return new OrdersSearchResultTO(this);
        }
    }
}
