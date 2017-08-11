package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.product.ProductCategory;
import be.spotsupply.rest.dto.product.ProductCategoryTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import be.spotsupply.rest.mapper.TOToDomainMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ProductCategoryMapper implements DomainToTOMapper<ProductCategory, ProductCategoryTO>, TOToDomainMapper<ProductCategoryTO, ProductCategory> {

    @Autowired
    private ProductTypeMapper productTypeMapper;

    @Autowired
    private TranslationsMapper translationsMapper;

    @Override
    public ProductCategoryTO mapToTO(ProductCategory productType) {
        if (productType == null) {
            return null;
        }
        return ProductCategoryTO.builder()
                .id(productType.getId())
                .name(translationsMapper.mapToTO(productType.getName()))
                .types(productTypeMapper.mapToTOs(productType.getTypes()))
                .sortingOrder(productType.getSortingOrder())
                .build();
    }

    @Override
    public ProductCategory mapToDomain(ProductCategoryTO to) {
        return ProductCategory.builder()
                .id(to.getId())
                .name(translationsMapper.mapToDomain(to.getName()))
                .types(new ArrayList<>())
                .sortingOrder(to.getSortingOrder())
                .build();

    }
}
