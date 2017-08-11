package be.spotsupply.rest.mapper;

import be.spotsupply.rest.AbstractTO;

import java.util.List;
import java.util.stream.Collectors;

public interface BiDirectionalMapper<T extends AbstractTO, D> {

    T mapToTO(D domainObject);

    default List<T> mapToTOs(List<D> domainObjects) {
        return domainObjects.stream()
                .map(this::mapToTO)
                .collect(Collectors.toList());
    }

    D mapToDomain(T to);

    default List<D> mapToDomain(List<T> tos) {
        return tos.stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }
}
