package be.spotsupply.domain.model.user;

import lombok.Builder;
import lombok.Getter;
import lombok.experimental.Tolerate;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "user_roles")
@Getter
@Builder
public class UserRoles {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",
            unique = true, nullable = false)
    private Long id;

    @ManyToOne
    private User user;

    @Column(name = "role", nullable = false, length = 45)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Tolerate
    public UserRoles(){
        // required by hibernate
    }
}
