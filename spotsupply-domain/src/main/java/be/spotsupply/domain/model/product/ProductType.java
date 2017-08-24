package be.spotsupply.domain.model.product;

import be.spotsupply.domain.commands.product.UpdateProductTypeCommand;
import be.spotsupply.domain.model.common.Translation;
import be.spotsupply.domain.model.common.VersionedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.util.List;

import static org.hibernate.validator.internal.util.CollectionHelper.newArrayList;

@Entity
@Table(name = "product_type")
@Getter
@Builder
public class ProductType extends VersionedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name_id", nullable = false)
    private Translation name;

    @Column(name = "has_title")
    private boolean hasTitle;

    @ManyToMany
    @JoinTable(name = "product_type_product",
            joinColumns = @JoinColumn(name = "product_type_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products = newArrayList();

    @ManyToOne
    @Setter
    private ProductCategory category;

    @Column(name = "sorting_order")
    private int sortingOrder;

    @Tolerate
    public ProductType() {
        // required by hibernate
    }

    public void updateProductType(UpdateProductTypeCommand command) {
        hasTitle = command.isHasTitle();
        sortingOrder = command.getSortingOrder();
        name.updateWith(command.getName());
    }
}
