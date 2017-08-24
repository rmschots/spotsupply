package be.spotsupply.e2e.tests.customer;

import be.spotsupply.domain.dao.product.ProductCategoryRepository;
import be.spotsupply.domain.dao.product.ProductRepository;
import be.spotsupply.domain.dao.product.ProductTypeRepository;
import be.spotsupply.domain.model.product.Product;
import be.spotsupply.domain.model.product.ProductCategory;
import be.spotsupply.domain.model.product.ProductType;
import be.spotsupply.e2e.page.tests.pages.CurrentOrderPage;
import be.spotsupply.e2e.page.tests.pages.OrderHistoryPage;
import be.spotsupply.service.DeliveryService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import static be.spotsupply.domain.model.product.ProductTestData.*;
import static java.util.Collections.singleton;

public class CreateOrderEndToEndTest extends CustomerSelenideEndToEndTest {

    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private TransactionTemplate transactionTemplate;


    @Before
    public void initTestData() {
        transactionTemplate.execute(status -> new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                ProductCategory productCategory = aProductCategory("Category1", 5).build();
                productCategory = productCategoryRepository.saveAndFlush(productCategory);

                ProductType productType = aProductType(productCategory, "Type1", 1).build();
                productCategory.getTypes().add(productType);
                productTypeRepository.saveAndFlush(productType);
            }
        });
        transactionTemplate.execute(status -> new TransactionCallbackWithoutResult() {
                @Override
                protected void doInTransactionWithoutResult(TransactionStatus status) {
                    ProductType productType = productTypeRepository.findAll().get(0);
                    Product product = aProduct("Product1")
                        .productTypes(singleton(productType))
                        .build();
                    productRepository.saveAndFlush(product);
                }
            }
        );
    }

    @Test
    public void createOrder() {

        int amountOfProducts = 20;

        CurrentOrderPage currentOrderPage = homePage
            .clickCheckitButton()
            .assertShopatButtonVisible()
            .clickShoptatButton()
            .goToTab(0)
            .clickAddProduct(1, amountOfProducts)
            .assertAmountOfProduct(1, amountOfProducts)
            .assertTotalPrice(amountOfProducts * 2.5)
            .clickNextButton()
            .assertTotalPrice(amountOfProducts * 2.5)
            .assertDeliverytime(deliveryService.getDeliveryTimes().get(0))
            .clickBringitButton()
            .confirm()
            .continueToCurrentOrderPage();

        // TODO: remove
        currentOrderPage = currentOrderPage.clickCompleteOrderButton();

        OrderHistoryPage orderHistoryPage = currentOrderPage
            .clickOrderHistoryTab()
            .assertAmountOfCarts(1)
            .assertHasCart(1);
    }
}
