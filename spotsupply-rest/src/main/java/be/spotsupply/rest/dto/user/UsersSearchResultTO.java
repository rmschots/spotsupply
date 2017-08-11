package be.spotsupply.rest.dto.user;

import be.spotsupply.rest.dto.common.SearchResultTO;
import lombok.Getter;

import java.util.List;

@Getter
public class UsersSearchResultTO extends SearchResultTO {
    private List<UserTO> users;

    UsersSearchResultTO(BuilderImpl builder) {
        this.pages = builder.pages;
        this.page = builder.page;
        this.filter = builder.filter;
        this.totalResults = builder.totalResults;
        this.pageSize = builder.pageSize;
        this.users = builder.users;
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
        private List<UserTO> users;

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

        public BuilderImpl users(List<UserTO> users) {
            this.users = users;
            return this;
        }

        public UsersSearchResultTO build() {
            return new UsersSearchResultTO(this);
        }
    }
}
