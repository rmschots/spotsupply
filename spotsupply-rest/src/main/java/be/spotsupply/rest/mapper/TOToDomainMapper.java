package be.spotsupply.rest.mapper;

import be.spotsupply.rest.AbstractTO;

import java.util.List;
import java.util.stream.Collectors;

@FunctionalInterface
public interface TOToDomainMapper<T extends AbstractTO, D> {

    D mapToDomain(T to);

    default List<D> mapToDomain(List<T> tos) {
        return tos.stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }
}
