package be.spotsupply.domain.model.user;

import be.spotsupply.domain.model.order.ShoppingCart;
import be.spotsupply.domain.model.common.VersionedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "user")
@Getter
@Builder
public class User extends VersionedEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Setter
    private String email;

    @Column(name = "phone_number", nullable = false)
    @Setter
    private String phoneNumber;
    @Column(name = "password_hash", length = 60)
    @Setter
    private String passwordHash;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private ShoppingCart cart;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<UserRoles> userRoles;

    @Column(nullable = false, columnDefinition = "tinyint(1) default 0")
    @Setter
    private boolean verified;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Verification> verifications;

    @Tolerate
    public User() {
        // required by hibernate
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getUserRoles().stream()
                .map(userRoles1 -> userRoles1.getRole().getGrantedAuthority())
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return verified;
    }
}
