package be.spotsupply.rest.endpoints.product;

import be.spotsupply.domain.commands.product.*;
import be.spotsupply.domain.model.product.ProductCategory;
import be.spotsupply.domain.model.product.ProductType;
import be.spotsupply.rest.dto.product.*;
import be.spotsupply.rest.mapper.impl.ProductCategoryMapper;
import be.spotsupply.rest.mapper.impl.ProductMapper;
import be.spotsupply.rest.mapper.impl.ProductTypeMapper;
import be.spotsupply.rest.mapper.impl.TranslationsMapper;
import be.spotsupply.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

import static be.spotsupply.domain.model.user.Role.Constants.ROLE_ADMIN;

@RestController
@RequestMapping("product")
public class ProductEndpoint {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductCategoryMapper productCategoryMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductTypeMapper productTypeMapper;

    @Autowired
    private TranslationsMapper translationsMapper;

    @GetMapping("productHierarchy")
    public List<ProductCategoryTO> getCategoryHierarchy() {
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }

    @GetMapping("untypedProducts")
    public List<ProductTO> getUntypedProducts() {
        return productMapper.mapToTOs(productService.getUntypedProducts());
    }

    @PostMapping("addProduct")
    @RolesAllowed(ROLE_ADMIN)
    public List<ProductCategoryTO> addProduct(@RequestBody CreateProductTO createProductTO) {
        CreateProductCommand createProductCommand = CreateProductCommand.builder()
                .active(createProductTO.isActive())
                .extraInfo(translationsMapper.mapToDomain(createProductTO.getExtraInfo()))
                .name(translationsMapper.mapToDomain(createProductTO.getName()))
                .price(createProductTO.getPrice())
                .productTypes(createProductTO.getProductTypes())
                .build();
        productService.createProduct(createProductCommand);
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }

    @PostMapping("updateProduct")
    @RolesAllowed(ROLE_ADMIN)
    public List<ProductCategoryTO> updateProduct(@RequestBody UpdateProductTO updateProductTO) {
        List<ProductType> productTypes = productService.findProductTypes(updateProductTO.getProductTypes());
        UpdateProductCommand command = UpdateProductCommand.builder()
                .id(updateProductTO.getId())
                .active(updateProductTO.isActive())
                .extraInfo(translationsMapper.mapToDomain(updateProductTO.getExtraInfo()))
                .name(translationsMapper.mapToDomain(updateProductTO.getName()))
                .price(updateProductTO.getPrice())
                .productTypes(productTypes)
                .build();
        productService.updateProduct(command);
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }

    @PostMapping("addProductType")
    @RolesAllowed(ROLE_ADMIN)
    public List<ProductCategoryTO> addProductType(@RequestBody CreateProductTypeTO createProductTypeTO) {
        ProductCategory productCategory = productService.getProductCategory(createProductTypeTO.getProductCategoryId());
        CreateProductTypeCommand command = CreateProductTypeCommand.builder()
                .hasTitle(createProductTypeTO.isHasTitle())
                .name(translationsMapper.mapToDomain(createProductTypeTO.getName()))
                .productCategory(productCategory)
                .sortingOrder(createProductTypeTO.getSortingOrder())
                .build();
        productService.createProductType(command);
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }

    @PostMapping("updateProductType")
    @RolesAllowed(ROLE_ADMIN)
    public List<ProductCategoryTO> updateProductType(@RequestBody UpdateProductTypeTO updateProductTypeTO) {
        UpdateProductTypeCommand command = UpdateProductTypeCommand.builder()
                .id(updateProductTypeTO.getId())
                .hasTitle(updateProductTypeTO.isHasTitle())
                .name(translationsMapper.mapToDomain(updateProductTypeTO.getName()))
                .sortingOrder(updateProductTypeTO.getSortingOrder())
                .build();
        productService.updateProductType(command);
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }

    @DeleteMapping("deleteProductType")
    @RolesAllowed(ROLE_ADMIN)
    @CrossOrigin
    public List<ProductCategoryTO> deleteProductType(@RequestParam Long productTypeId) {
        productService.deleteProductType(productTypeId);
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }

    @PostMapping("addProductCategory")
    @RolesAllowed(ROLE_ADMIN)
    public List<ProductCategoryTO> addProductCategory(@RequestBody CreateProductCategoryTO createProductCategoryTO) {
        CreateProductCategoryCommand command = CreateProductCategoryCommand.builder()
                .name(translationsMapper.mapToDomain(createProductCategoryTO.getName()))
                .sortingOrder(createProductCategoryTO.getSortingOrder())
                .build();
        productService.createProductCategory(command);
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }

    @PostMapping("updateProductCategory")
    @RolesAllowed(ROLE_ADMIN)
    public List<ProductCategoryTO> updateProductCategory(@RequestBody UpdateProductCategoryTO updateProductCategoryTO) {
        UpdateProductCategoryCommand command = UpdateProductCategoryCommand.builder()
                .productCategoryId(updateProductCategoryTO.getId())
                .name(translationsMapper.mapToDomain(updateProductCategoryTO.getName()))
                .sortingOrder(updateProductCategoryTO.getSortingOrder())
                .build();
        productService.updateProductCategory(command);
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }

    @DeleteMapping("deleteProductCategory")
    @RolesAllowed(ROLE_ADMIN)
    @CrossOrigin
    public List<ProductCategoryTO> deleteProductCategory(@RequestParam Long productCategoryId) {
        productService.deleteProductCategory(productCategoryId);
        return productCategoryMapper.mapToTOs(productService.getCategoryHierarchy());
    }
}
