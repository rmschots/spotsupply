package be.spotsupply.service.async;

import be.spotsupply.domain.dao.user.VerificationRepository;
import be.spotsupply.domain.model.user.Verification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class MailService {

    @Value("${spotsupply.web.url}")
    private String webUrl;

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    @Lazy
    private JavaMailSender javaMailSender;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void sendVerificationMail(String email, String verificationCode, String title, String urlPath) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(title);
        message.setText(webUrl + urlPath + verificationCode);
        javaMailSender.send(message);
        Verification verification = verificationRepository.findOne(verificationCode);
        verification.setMailSentDateTime(LocalDateTime.now());
        verificationRepository.save(verification);
    }
}
