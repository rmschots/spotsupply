package be.spotsupply.domain.model.user;

import be.spotsupply.domain.model.common.VersionedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "verification",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "type"})}
)
@Getter
@Builder
public class Verification extends VersionedEntity {
    @Id
    @Column(name = "verification_key")
    @Length(min = 36, max = 36)
    private String verificationCode;

    @ManyToOne(optional = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationType type;

    @Column(name = "mail_sent_date_time")
    @Setter
    private LocalDateTime mailSentDateTime;

    @Tolerate
    public Verification() {
        // required by hibernate
    }

    public boolean isExpired(){
        return mailSentDateTime == null || LocalDateTime.now().isAfter(mailSentDateTime.plusMinutes(10));
    }
}
