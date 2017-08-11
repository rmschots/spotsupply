package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.product.Product;
import be.spotsupply.rest.dto.product.ProductTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import be.spotsupply.rest.mapper.TOToDomainMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class ProductMapper implements DomainToTOMapper<Product, ProductTO>, TOToDomainMapper<ProductTO, Product> {

    @Autowired
    private TranslationsMapper translationsMapper;

    @Override
    public ProductTO mapToTO(Product product) {
        if (product == null) {
            return null;
        }
        return ProductTO.builder()
                .id(product.getId())
                .name(translationsMapper.mapToTO(product.getName()))
                .extraInfo(translationsMapper.mapToTO(product.getExtraInfo()))
                .price(product.getPrice())
                .active(product.isActive())
                .build();
    }

    @Override
    public Product mapToDomain(ProductTO to) {
        return Product.builder()
                .id(to.getId())
                .name(translationsMapper.mapToDomain(to.getName()))
                .extraInfo(translationsMapper.mapToDomain(to.getExtraInfo()))
                .price(to.getPrice())
                .productTypes(new HashSet<>())
                .active(to.isActive())
                .build();
    }
}
