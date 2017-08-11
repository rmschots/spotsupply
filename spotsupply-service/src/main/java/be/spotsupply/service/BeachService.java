package be.spotsupply.service;

import be.spotsupply.domain.dao.beach.BeachRepository;
import be.spotsupply.domain.model.beach.Beach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeachService {

    @Autowired
    private BeachRepository beachRepository;

    public Beach findBeach(Long beachId) {
        return beachRepository.findOne(beachId);
    }

    public List<Beach> getAllBeaches() {
        return beachRepository.findAll();
    }
}
