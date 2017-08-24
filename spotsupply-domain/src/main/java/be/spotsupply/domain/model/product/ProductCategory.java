package be.spotsupply.domain.model.product;

import be.spotsupply.domain.commands.product.UpdateProductCategoryCommand;
import be.spotsupply.domain.model.common.Translation;
import be.spotsupply.domain.model.common.VersionedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.Tolerate;
import org.hibernate.validator.internal.util.CollectionHelper;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static org.hibernate.validator.internal.util.CollectionHelper.newArrayList;

@Entity
@Table(name = "product_category")
@Getter
@Builder
public class ProductCategory extends VersionedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name_id")
    private Translation name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @OrderBy("sorting_order")
    private List<ProductType> types = newArrayList();

    @Column(name = "sorting_order")
    private int sortingOrder;

    @Tolerate
    public ProductCategory() {
        // required by hibernate
    }

    public void updateProductCategory(UpdateProductCategoryCommand command) {
        name.updateWith(command.getName());
        sortingOrder = command.getSortingOrder();
    }
}
