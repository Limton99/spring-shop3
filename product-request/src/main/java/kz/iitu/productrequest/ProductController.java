package kz.iitu.productrequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/product/request")
public class ProductController {
    private final Producer producer;
    private ProductInfoService productInfoService;

    @Autowired
    public ProductController(Producer producer, ProductInfoService productInfoService) {
        this.producer = producer;
        this.productInfoService = productInfoService;
    }

    // TODO Ideally there should POST request
    @GetMapping
    public String sendMessageToKafkaTopic2(@RequestParam("userId") String userId,
                                           @RequestParam("productId") Long productId) {

        ProductRequest productRequest = new ProductRequest(userId, productInfoService.getProductById(productId));
        this.producer.productRequestNotify(productRequest);
        return "Your request sent successful!";
    }
}
