package be.spotsupply.rest.mapper.impl;

import be.spotsupply.domain.model.common.Translation;
import be.spotsupply.rest.dto.common.TranslationsTO;
import be.spotsupply.rest.mapper.DomainToTOMapper;
import be.spotsupply.rest.mapper.TOToDomainMapper;
import org.springframework.stereotype.Component;

@Component
public class TranslationsMapper implements DomainToTOMapper<Translation, TranslationsTO>, TOToDomainMapper<TranslationsTO, Translation> {

    @Override
    public TranslationsTO mapToTO(Translation domainObject) {
        if(domainObject == null){
            return null;
        }
        return TranslationsTO.builder()
                .en(domainObject.getTextEnglish())
                .nl(domainObject.getTextDutch())
                .fr(domainObject.getTextFrench())
                .build();
    }

    @Override
    public Translation mapToDomain(TranslationsTO to) {
        return Translation.builder()
                .textEnglish(to.getEn())
                .textDutch(to.getNl())
                .textFrench(to.getFr())
                .build();
    }
}
