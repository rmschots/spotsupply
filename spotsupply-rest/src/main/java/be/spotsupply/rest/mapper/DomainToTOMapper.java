package be.spotsupply.rest.mapper;

import be.spotsupply.rest.AbstractTO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@FunctionalInterface
public interface DomainToTOMapper<D, T extends AbstractTO> {

    T mapToTO(D domainObject);

    default List<T> mapToTOs(List<D> domainObjects) {
        if (domainObjects == null) {
            return Collections.emptyList();
        }
        return domainObjects.stream()
                .map(this::mapToTO)
                .collect(Collectors.toList());
    }
}
