package be.spotsupply.domain.model.beach;

import be.spotsupply.domain.util.CoordinatesToStringConverter;
import be.spotsupply.domain.model.common.Coordinate;
import be.spotsupply.domain.model.common.VersionedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "beach")
@Getter
@Builder
public class Beach extends VersionedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Convert(converter = CoordinatesToStringConverter.class)
    @Column(nullable = false, length = 2048)
    private List<Coordinate> coordinates;

    @Tolerate
    public Beach() {
        // required by hibernate
    }
}
