package kz.iitu.notifyservice;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class Consumer {
    @KafkaListener(topics = "product_requests", groupId = "group_id")
    public void consume(ProductRequest productRequest) throws IOException {
        System.out.println(String.format("#### -> Notify user by email: -> %s",
                "User " + productRequest.getUserId() + " purchased product "
                        + productRequest.getProduct().toString()));
    }
}
