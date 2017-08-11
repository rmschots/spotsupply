package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.product.ProductType;
import be.spotsupply.rest.dto.product.ProductTypeTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import be.spotsupply.rest.mapper.TOToDomainMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ProductTypeMapper implements DomainToTOMapper<ProductType, ProductTypeTO>, TOToDomainMapper<ProductTypeTO, ProductType> {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private TranslationsMapper translationsMapper;

    @Override
    public ProductTypeTO mapToTO(ProductType productType) {
        if (productType == null) {
            return null;
        }
        return ProductTypeTO.builder()
                .id(productType.getId())
                .name(translationsMapper.mapToTO(productType.getName()))
                .hasTitle(productType.isHasTitle())
                .sortingOrder(productType.getSortingOrder())
                .products(productMapper.mapToTOs(productType.getProducts()))
                .build();
    }

    @Override
    public ProductType mapToDomain(ProductTypeTO to) {
        if(to == null) {
            return null;
        }
        return ProductType.builder()
                .id(to.getId())
                .hasTitle(to.isHasTitle())
                .name(translationsMapper.mapToDomain(to.getName()))
                .sortingOrder(to.getSortingOrder())
                .products(new ArrayList<>())
                .build();
    }
}
