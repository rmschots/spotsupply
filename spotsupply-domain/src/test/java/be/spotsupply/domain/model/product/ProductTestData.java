package be.spotsupply.domain.model.product;

import java.util.ArrayList;
import java.util.HashSet;

import static be.spotsupply.domain.model.common.TranslationTestData.aTranslation;

public class ProductTestData {

    public static ProductCategory.ProductCategoryBuilder aProductCategory(String name, int sortingOrder) {
        return ProductCategory.builder()
            .name(aTranslation(name).build())
            .sortingOrder(sortingOrder)
            .types(new ArrayList<>());
    }

    public static ProductType.ProductTypeBuilder aProductType(ProductCategory productCategory, String name, int sortingOrder) {
        return ProductType.builder()
            .name(aTranslation(name).build())
            .category(productCategory)
            .hasTitle(true)
            .sortingOrder(sortingOrder)
            .products(new ArrayList<>());
    }

    public static Product.ProductBuilder aProduct(String name) {
        return Product.builder()
            .active(true)
            .price(1.2)
            .name(aTranslation(name).build())
            .productTypes(new HashSet<>());
    }
}
