package kz.iitu.productservice;

import kz.iitu.productservice.Models.Product;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


import java.util.ArrayList;
import java.util.List;

@EnableEurekaClient
@SpringBootApplication
public class ProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }

    public static List<Product> list;

    public static List<Product> getProducts() {
        if (list == null) {
            list = new ArrayList<>();
            Product p1 = new Product(1L, "Milk", "2.99", "10");
            Product p2 = new Product(2L, "Ice Cream", "0.99", "15");
            list.add(p1);
            list.add(p2);
        }
        return list;
    }
}
