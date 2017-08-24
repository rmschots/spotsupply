package be.spotsupply.domain.model.product;

import be.spotsupply.domain.commands.product.UpdateProductCommand;
import be.spotsupply.domain.model.common.Translation;
import be.spotsupply.domain.model.common.VersionedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.util.Set;

import static org.hibernate.validator.internal.util.CollectionHelper.newHashSet;

@Entity
@Table(name = "product")
@Getter
@Builder
@Setter()
public class Product extends VersionedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name_id", nullable = false)
    private Translation name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "extra_info_id")
    private Translation extraInfo;

    private Double price;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "product_type_product", joinColumns = {@JoinColumn(name = "product_id")}, inverseJoinColumns = {@JoinColumn(name = "product_type_id")})
    private Set<ProductType> productTypes = newHashSet();

    private boolean active = false;

    @Tolerate
    public Product() {
        // required by hibernate
    }

    public void updateProduct(UpdateProductCommand command) {
        price = command.getPrice();
        productTypes.clear();
        productTypes.addAll(command.getProductTypes());
        name.updateWith(command.getName());
        extraInfo.updateWith(command.getExtraInfo());
        active = command.isActive();
    }
}
