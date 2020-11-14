package kz.iitu.userservice;

import kz.iitu.userservice.Models.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;

import java.util.ArrayList;
import java.util.List;

@EnableEurekaClient
@SpringBootApplication
@EnableCircuitBreaker
@EnableHystrixDashboard
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

    public static List<User> list;

    public static List<User> getUsers() {
        if (list == null) {
            list = new ArrayList<>();
            User u1 = new User(1L, "Yeldar", 21);
            User u2 = new User(2L, "Aru", 20);
            list.add(u1);
            list.add(u2);
        }
        return list;
    }

}
