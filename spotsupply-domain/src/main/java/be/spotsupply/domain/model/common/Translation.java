package be.spotsupply.domain.model.common;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Entity
@Table(name = "translation")
public class Translation extends VersionedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text_en")
    private String textEnglish;

    @Column(name = "text_nl")
    private String textDutch;

    @Column(name = "text_fr")
    private String textFrench;

    @Tolerate
    public Translation() {
        // required by hibernate
    }

    public void updateWith(Translation translation) {
        this.textEnglish = translation.textEnglish;
        this.textDutch = translation.textDutch;
        this.textFrench = translation.textFrench;
    }

    private String getTranslationFor(Language language) {
        switch (language) {
            case EN:
                return textEnglish;
            case NL:
                return textDutch;
            case FR:
                return textFrench;
            default:
                return textEnglish;
        }
    }
}
