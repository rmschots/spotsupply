package be.spotsupply.service;

import be.spotsupply.domain.commands.product.*;
import be.spotsupply.domain.dao.product.ProductCategoryRepository;
import be.spotsupply.domain.dao.product.ProductRepository;
import be.spotsupply.domain.dao.product.ProductTypeRepository;
import be.spotsupply.domain.model.product.Product;
import be.spotsupply.domain.model.product.ProductCategory;
import be.spotsupply.domain.model.product.ProductType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    public List<ProductCategory> getCategoryHierarchy() {
        return productCategoryRepository.findAll(new Sort("sortingOrder"));
    }

    public List<Product> getUntypedProducts() {
        return productRepository.findAllByProductTypesIsNull();
    }

    @Transactional
    public void createProduct(CreateProductCommand createProductCommand) {
        Set<ProductType> productTypes = new HashSet<>(productTypeRepository.findAll(createProductCommand.getProductTypes()));
        Product createdProduct = Product.builder()
                .active(createProductCommand.isActive())
                .extraInfo(createProductCommand.getExtraInfo())
                .name(createProductCommand.getName())
                .price(createProductCommand.getPrice())
                .productTypes(productTypes)
                .build();
        productRepository.saveAndFlush(createdProduct);
    }

    @Transactional
    public void updateProduct(UpdateProductCommand updateProductCommand) {
        Product product = productRepository.findOne(updateProductCommand.getId());
        product.updateProduct(updateProductCommand);
        productRepository.saveAndFlush(product);
    }

    @Transactional
    public void createProductType(CreateProductTypeCommand command) {
        ProductType productType = ProductType.builder()
                .category(command.getProductCategory())
                .hasTitle(command.isHasTitle())
                .name(command.getName())
                .products(new ArrayList<>())
                .sortingOrder(command.getSortingOrder())
                .build();
        productTypeRepository.saveAndFlush(productType);
    }

    @Transactional
    public void updateProductType(UpdateProductTypeCommand command) {
        ProductType productType = productTypeRepository.findOne(command.getId());
        productType.updateProductType(command);
        productTypeRepository.saveAndFlush(productType);
    }

    @Transactional
    public void deleteProductType(Long productTypeId) {
        productTypeRepository.delete(productTypeId);
    }

    @Transactional
    public void createProductCategory(CreateProductCategoryCommand command) {
        ProductCategory productCategory = ProductCategory.builder()
                .name(command.getName())
                .sortingOrder(command.getSortingOrder())
                .types(new ArrayList<>())
                .build();
        productCategoryRepository.saveAndFlush(productCategory);
    }

    @Transactional
    public void updateProductCategory(UpdateProductCategoryCommand command) {
        ProductCategory productCategory = productCategoryRepository.findOne(command.getProductCategoryId());
        productCategory.updateProductCategory(command);
        productCategoryRepository.saveAndFlush(productCategory);
    }

    @Transactional
    public void deleteProductCategory(Long productCategoryId) {
        productCategoryRepository.delete(productCategoryId);
    }

    public List<ProductType> findProductTypes(List<Long> productTypes) {
        return productTypeRepository.findAll(productTypes);
    }

    public ProductCategory getProductCategory(Long productCategoryId) {
        return productCategoryRepository.findOne(productCategoryId);
    }

    public List<Product> findAll(List<Long> collect) {
        return productRepository.findAll(collect);
    }
}
