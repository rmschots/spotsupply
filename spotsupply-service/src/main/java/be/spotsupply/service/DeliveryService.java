package be.spotsupply.service;

import be.spotsupply.service.exceptions.CannotDeliverAtThisTimeException;
import be.spotsupply.service.exceptions.InvalidDeliveryTimeException;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    private LocalTime earliestDeliveryTime = LocalTime.of(9, 0);
    private LocalTime latestDeliveryTime = LocalTime.of(22, 0);

    public List<String> getDeliveryTimes() {
        LocalTime now = LocalTime.now();

        if (now.isAfter(latestDeliveryTime.minusMinutes(15))) {
            throw new CannotDeliverAtThisTimeException(latestDeliveryTime.toString());
        }

        LocalTime earliestNext = now.withSecond(0).withNano(0).plusMinutes(15);

        List<LocalTime> deliveryTimes = new ArrayList<>();
        LocalTime possibleTime = earliestDeliveryTime;
        while (possibleTime.isBefore(latestDeliveryTime)) {
            if (earliestNext.isBefore(possibleTime)) {
                deliveryTimes.add(possibleTime);
            }
            possibleTime = possibleTime.plusMinutes(15);
        }
        List<String> deliveryTimesString = deliveryTimes.stream().map(LocalTime::toString).collect(Collectors.toList());
        if (!deliveryTimes.contains(earliestDeliveryTime)) {
            deliveryTimesString.add(0, "ASAP");
        }

        return deliveryTimesString;
    }

    public void validateDeliveryTime(String deliveryTime) {
        if (getDeliveryTimes().stream().noneMatch(s -> s.equals(deliveryTime))) {
            throw new InvalidDeliveryTimeException();
        }
    }
}
