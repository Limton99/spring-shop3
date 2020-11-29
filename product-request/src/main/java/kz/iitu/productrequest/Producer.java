package kz.iitu.productrequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class Producer {
    private static final String TOPIC = "product_requests";

    @Autowired
    private KafkaTemplate<String, ProductRequest> kafkaTemplate;

    public String productRequestNotify(ProductRequest productRequest) {
        System.out.println(String.format("#### -> Producing book request to notification service -> %s", productRequest));
        this.kafkaTemplate.send(TOPIC, productRequest);
        return "Successfully";
    }
}
